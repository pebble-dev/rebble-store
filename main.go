package main

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
	"github.com/pborman/getopt"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		w.WriteHeader(404)
		w.Write([]byte("404 Not Found<br />Try <a href='/'>Home</a>?"))
		return
	}
	fmt.Fprintf(w, "<a href='/apps'>Apps</a>")
}

func RecurseFolder(w http.ResponseWriter, path string, f os.FileInfo, lvl int) {
	for i := 0; i < lvl; i++ {
		w.Write([]byte("="))
	}
	fmt.Fprintf(w, "> %s<br />", f.Name())
	if f.IsDir() {
		fpath := fmt.Sprintf("%s/%s", path, f.Name())
		folder, err := ioutil.ReadDir(fpath)
		if err != nil {
			log.Println(err)
			return
		}
		for _, f1 := range folder {
			RecurseFolder(w, fpath, f1, lvl+1)
		}
	}
}

//var db *sql.DB

func AppsHandler(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("sqlite3", "./foo.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	rows, err := db.Query("SELECT name, author from foo ORDER BY published_date ASC LIMIT 20")
	if err != nil {
		log.Fatal(err)
	}
	for rows.Next() {
		item := PApplication{}
		err = rows.Scan(&item.Name, &item.Author)
		fmt.Fprintf(w, "Item: %s\n Author: %s\n\n", item.Name, item.Author)
	}
}

var (
	buildstamp    string = "Unknown build timestamp"
	githash       string = "Unknown git hash"
	buildhost     string = "Unknown build host"
	versionstring string = "0.0.1"
)

func main() {
	var version bool
	getopt.BoolVarLong(&version, "version", 'V', "Get the current version info")
	getopt.Parse()
	if version {
		fmt.Fprintf(os.Stderr, "Version %s\nBuild Host: %s\nBuild Date: %s\nBuild Hash: %s\n", versionstring, buildhost, buildstamp, githash)
		return
	}
	r := mux.NewRouter()
	r.HandleFunc("/", HomeHandler).Methods("GET")
	r.HandleFunc("/apps", AppsHandler).Methods("GET")
	r.HandleFunc("/admin/rebuild/db", ARebuildDBHandler).Host("localhost")
	loggedRouter := handlers.LoggingHandler(os.Stdout, r)
	http.Handle("/", r)
	http.ListenAndServe(":8080", loggedRouter)
}

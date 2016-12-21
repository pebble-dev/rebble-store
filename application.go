package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

// A list of PebbleApplications
type PebbleAppList struct {
	Apps []*PebbleApplication `json:"data"`
}

// PebbleApplication contains Pebble App information from the DB
type PebbleApplication struct {
	Author    string   `json:"author"`
	Category  string   `json:"category_name"`
	Name      string   `json:"title"`
	Published JSONTime `json:"published_date"`
}

func parseApp(path string) *PebbleApplication {
	//log.Println(path)
	f, err := ioutil.ReadFile(path)
	if err != nil {
		log.Fatal(err)
	}
	var data = PebbleAppList{}
	//log.Println(string(f))
	err = json.Unmarshal(f, &data)
	if err != nil {
		log.Fatal(err)
	}
	if len(data.Apps) != 1 {
		//log.Println(data)
		//log.Println(data.Data)
		panic("Data is not the size of 1")
	}
	return data.Apps[0]
}

// HomeHandler is the index page.
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

// AppsHandler lists all of the available applications from the backend DB.
func AppsHandler(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("sqlite3", "./foo.db")
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte("Unable to connect to DB"))
		log.Println(err)
		return
	}
	defer db.Close()
	rows, err := db.Query("SELECT name, author from foo ORDER BY published_date ASC LIMIT 20")
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte("Unable to connect to DB"))
		log.Println(err)
		return
	}
	for rows.Next() {
		item := PebbleApplication{}
		err = rows.Scan(&item.Name, &item.Author)
		fmt.Fprintf(w, "Item: %s\n Author: %s\n\n", item.Name, item.Author)
	}
}

package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

// walkFiles is intended to quickly crawl the pebble application folder
// in-order to re-build the application database.
func walkFiles(root string) (<-chan string, <-chan error) {
	// Create a couple of channels to communicate with the main process.
	// (multi-threading FTW!)
	paths := make(chan string)
	errf := make(chan error, 1)

	// Crawl the directory in the background.
	go func() {
		defer close(paths)
		errf <- filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
			if err != nil {
				log.Println(err)
			}
			if info.IsDir() {
				return nil
			}
			if strings.HasSuffix(info.Name(), ".json") {
				paths <- path
			}
			return nil
		})
	}()

	// Return the channels so that our goroutine can communicate with the main
	// thread.
	return paths, errf
}

// JSONTime is a dummy time object that is meant to allow Go's JSON module to
// properly de-serialize the JSON time format.
type JSONTime struct {
	time.Time
}

// UnmarshalJSON allows for the custom time format within the application JSON
// to be decoded into Go's native time format.
func (self *JSONTime) UnmarshalJSON(b []byte) (err error) {
	s := string(b)

	// Return an empty time.Time object if it didn't exist in the first place.
	if s == "null" {
		self.Time = time.Time{}
		return
	}

	t, err := time.Parse("\"2006-01-02T15:04:05.999Z\"", s)
	if err != nil {
		t = time.Time{}
	}
	self.Time = t
	return
}

// AdminRebuildDBHandler allows an administrator to rebuild the database from
// the application directory after hitting a single API end point.
func AdminRebuildDBHandler(w http.ResponseWriter, r *http.Request) {
	//w.WriteHeader(418)
	//fmt.Fprintf(w, "I'm a teapot!")
	/*
		w.Header().Add("content-type", "text/html")
		path, errc := walkFiles("PebbleAppStore/apps")
		for item := range path {
			fmt.Fprintf(w, "File: %s<br />", item)
		}
		if err := <-errc; err != nil {
			log.Fatal(err)
		}
		/**/

	//return /*
	//db.Close()
	os.Remove("./foo.db")
	db, err := sql.Open("sqlite3", "./foo.db")
	if err != nil {
		log.Fatal(err)
	}
	sqlStmt := `
			create table foo (
				id integer not null primary key,
				name text,
				author text,
				category text,
				published_date integer
			);
			delete from foo;
		`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return
	}

	tx, err := db.Begin()
	if err != nil {
		log.Fatal(err)
	}
	stmt, err := tx.Prepare("insert into foo(name, author, category, published_date) values(?, ?, ?, ?)")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	path, errc := walkFiles("PebbleAppStore/apps")
	for item := range path {
		//fmt.Fprintf(w, "File: %s<br />", item)
		app := parseApp(item)
		_, err = stmt.Exec(app.Name, app.Author, app.Category, app.Published.UnixNano())
	}
	if err := <-errc; err != nil {
		log.Fatal(err)
	}
	tx.Commit()

	/**/
}

// AdminVersionHandler returns the latest build information from the host
// in-which it was built on, such as: The current application version, the host
// that built the binary, the date in-which the binary was built, and the
// current git commit hash. Build information is populated during builds
// triggered via the "make build" or "sup production deploy" commands.
func AdminVersionHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Version %s\nBuild Host: %s\nBuild Date: %s\nBuild Hash: %s\n", Buildversionstring, Buildhost, Buildstamp, Buildgithash)
}

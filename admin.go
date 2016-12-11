package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

func walkFiles(root string) (<-chan string, <-chan error) {
	paths := make(chan string)
	errf := make(chan error, 1)
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
	return paths, errf
}

func strToDate(s string) int64 {
	t, _ := time.Parse(time.RFC3339Nano, s)
	return t.UnixNano()
}

type MyTime struct {
	time.Time
}

func (self *MyTime) UnmarshalJSON(b []byte) (err error) {
	s := string(b)

	if s == "null" {
		self.Time = time.Time{}
		return
	}

	// Get rid of the quotes "" around the value.
	// A second option would be to include them
	// in the date format string instead, like so below:
	//   time.Parse(`"`+time.RFC3339Nano+`"`, s)
	s = s[1 : len(s)-1]

	//t, err := time.Parse(time.RFC3339Nano, s)
	t, err := time.Parse("2006-01-02T15:04:05.999Z", s)
	if err != nil {
		t = time.Time{}
	}
	self.Time = t
	return
}

func ARebuildDBHandler(w http.ResponseWriter, r *http.Request) {
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

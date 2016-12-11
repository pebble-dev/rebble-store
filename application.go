package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
)

type AppList struct {
	Apps []*PApplication
}

type PApplication struct {
	Author    string `json:"author"`
	Category  string `json:"category_name"`
	Name      string `json:"title"`
	Published MyTime `json:"published_date"`
}

func parseApp(path string) *PApplication {
	//log.Println(path)
	f, err := ioutil.ReadFile(path)
	if err != nil {
		log.Fatal(err)
	}
	var data = struct {
		Data []*PApplication `json:"data"`
	}{}
	//log.Println(string(f))
	err = json.Unmarshal(f, &data)
	if err != nil {
		log.Fatal(err)
	}
	if len(data.Data) != 1 {
		//log.Println(data)
		//log.Println(data.Data)
		panic("Data is not the size of 1")
	}
	return data.Data[0]
}

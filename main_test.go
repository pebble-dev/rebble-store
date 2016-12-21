package main

import (
	"os"
	"testing"

	"github.com/adams-sarah/test2doc/test"
	"github.com/gorilla/mux"
)

var server *test.Server

func TestMain(m *testing.M) {
	var err error

	var r = Handlers()
	r.KeepContext = true
	test.RegisterURLVarExtractor(mux.Vars)

	server, err = test.NewServer(r)
	if err != nil {
		panic(err.Error())
	}
	defer server.Close()
	exitCode := m.Run()

	server.Finish()

	os.Exit(exitCode)
}

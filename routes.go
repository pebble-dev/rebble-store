package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

// DummyHandler is useful for adding a route when the handler hasn't been
// completed/fleshed out yet.
func DummyHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(501)
	w.Write([]byte("501 Not Implemented"))
}

// Handlers returns a mux.Router with all possible routes already setup.
func Handlers() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/", HomeHandler).Methods("GET")
	r.HandleFunc("/dev/apps", AppsHandler).Methods("GET")
	r.HandleFunc("/admin/rebuild/db", AdminRebuildDBHandler).Host("localhost")
	r.HandleFunc("/admin/version", AdminVersionHandler)
	r.HandleFunc("/boot/", BootHandler).Methods("GET")
	return r
}

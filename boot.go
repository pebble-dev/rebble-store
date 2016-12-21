package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

const (
	PEBBLE_BOOT_URL string = "https://boot.getpebble.com/api/config/"
	STORE_URI       string = "https://santoku.adamfourney.com"
)

// BootJSON is just a Go container object for the JSON response.
type BootJSON struct {
	Config BootConfig `json:"config"`
}

// BootConfig contains the webviews from the JSON file.
type BootConfig struct {
	Webviews WebviewsConfig `json:"webviews"`
}

// WebviewConfig contains the webviews in-which we would like to override.
type WebviewsConfig struct {
	FAQ                  string `json:"support/faq"`
	Application          string `json:"appstore/application"`
	ApplicationChangelog string `json:"appstore/application_changelog"`
	DeveloperApps        string `json:"appstore/developer_apps"`
	Watchfaces           string `json:"appstore/watchfaces"`
	Watchapps            string `json:"appstore/watchapps"`
}

// BootHandler is based off of [@afourney|https://github.com/afourney]'s
// development bootstrap override.
func BootHandler(w http.ResponseWriter, r *http.Request) {

	// Get a store uri from the request and determine if it matches a valid URI
	store_uri := r.URL.Query().Get("store_uri")
	if _, err := url.Parse(store_uri); err != nil {
		w.WriteHeader(400)
		w.Write([]byte("Invalid store_uri parameter"))
		return
	}

	// If the user didn't specify a store_uri, use the pebble server
	if store_uri == "" {
		store_uri = PEBBLE_BOOT_URL
	} else {
		r.URL.Query().Del("store_uri")
	}

	// Build up the request URL
	request_url := fmt.Sprintf("%s/%s?%s", store_uri, r.URL.RawPath, r.URL.RawQuery)

	// Make a request to an external server then parse the request
	req, err := http.Get(request_url)
	if err != nil {
		log.Fatal(err)
	}
	data, err := ioutil.ReadAll(req.Body)
	if err != nil {
		log.Fatal(err)
	}

	// Decode the JSON data
	response := &BootJSON{}
	err = json.Unmarshal(data, response)
	if err != nil {
		log.Println(err)
		w.Write(data)
		return
	}

	// Replace items in the JSON object, then prepare to output it
	response.Config.Webviews.FAQ = fmt.Sprintf("%s/faq", STORE_URI)
	response.Config.Webviews.Application = fmt.Sprintf("%s/application/$$id$$?pebble_color=$$pebble_color$$&hardware=$$hardware$$&uid=$$user_id$$&mid=$$phone_id$$&pid=$$pebble_id$$&$$extras$$", STORE_URI)
	response.Config.Webviews.ApplicationChangelog = fmt.Sprintf("%s/changelog/$$id$$?pebble_color=$$pebble_color$$&hardware=$$hardware$$&uid=$$user_id$$&mid=$$phone_id$$&pid=$$pebble_id$$&$$extras$$", STORE_URI)
	response.Config.Webviews.DeveloperApps = fmt.Sprintf("%s/developer/$$id$$?pebble_color=$$pebble_color$$&hardware=$$hardware$$&uid=$$user_id$$&mid=$$phone_id$$&pid=$$pebble_id$$&$$extras$$", STORE_URI)
	response.Config.Webviews.Watchfaces = fmt.Sprintf("%s/watchfaces?pebble_color=$$pebble_color$$&hardware=$$hardware$$&uid=$$user_id$$&mid=$$phone_id$$&pid=$$pebble_id$$&$$extras$$", STORE_URI)
	response.Config.Webviews.Watchapps = fmt.Sprintf("%s/watchapps?pebble_color=$$pebble_color$$&hardware=$$hardware$$&uid=$$user_id$$&mid=$$phone_id$$&pid=$$pebble_id$$&$$extras$$", STORE_URI)
	data, err = json.Marshal(response)
	if err != nil {
		log.Fatal(err)
	}

	// Send the JSON object back to the user
	w.Header().Add("content-type", "application/json")
	w.Write(data)
}

package main

import (
	_ "embed"

	"FileServe.net/server/global"
	"FileServe.net/server/global/config"
	"FileServe.net/server/ready"
	"FileServe.net/server/router"
	jsoniter "github.com/json-iterator/go"
)

// https://juejin.cn/post/6987204577879654407

//go:embed package.json
var AppPackage []byte

func main() {
	jsoniter.Unmarshal(AppPackage, &config.AppInfo)
	// 初始化系统参数
	global.Start()

	ready.Start()

	router.Start()
}

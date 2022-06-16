package config

import (
	"os"

	"github.com/EasyGolang/goTools/mPath"
	"github.com/EasyGolang/goTools/mStr"
)

type DirType struct {
	Home       string `json:"Home"`       // Home 根目录
	App        string `json:"App"`        // APP 根目录
	Log        string `json:"Log"`        // 日志文件目录
	UpFilePath string `json:"UpFilePath"` // 文件保存目录
}

type FileType struct {
	SysEnv      string `json:"SysEnv"`      // /root/sys_env.yaml
	LocalSysEnv string `json:"LocalSysEnv"` // ./sys_env.yaml
	AppEnv      string `json:"AppEnv"`      // ./app_env.yaml
	StartShell  string `json:"StartShell"`  // ./start.sh
	StopShell   string `json:"StopShell"`   // ./stop.sh
}

var (
	Dir  DirType
	File FileType
)

func DirInit() {
	Dir.Home = mPath.HomePath()

	Dir.App, _ = os.Getwd()

	Dir.Log = mStr.Join(
		Dir.App,
		mStr.ToStr(os.PathSeparator),
		"logs",
	)

	Dir.UpFilePath = mStr.Join(
		Dir.Home,
		mStr.ToStr(os.PathSeparator),
		"ProdProject",
		mStr.ToStr(os.PathSeparator),
		"file.mo7.cc",
	)

	File.SysEnv = mStr.Join(
		Dir.Home,
		mStr.ToStr(os.PathSeparator),
		"sys_env.yaml",
	)
	File.LocalSysEnv = mStr.Join(
		Dir.App,
		mStr.ToStr(os.PathSeparator),
		"sys_env.yaml",
	)

	File.AppEnv = mStr.Join(
		Dir.App,
		mStr.ToStr(os.PathSeparator),
		"app_env.yaml",
	)

	File.StartShell = mStr.Join(
		Dir.App,
		mStr.ToStr(os.PathSeparator),
		"start.sh",
	)

	File.StopShell = mStr.Join(
		Dir.App,
		mStr.ToStr(os.PathSeparator),
		"stop.sh",
	)
}

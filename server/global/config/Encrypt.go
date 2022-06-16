package config

import (
	"time"

	"github.com/EasyGolang/goTools/mEncrypt"
	"github.com/EasyGolang/goTools/mStr"
)

var SecretKey = mEncrypt.MD5("FileServe.net from mo7")

func Encrypt(msg string) string {
	now := time.Now().Unix() / 30 // 分钟秒级别

	return mEncrypt.Sha256(
		mStr.Join(msg, "mo7", now),
		SecretKey)
}

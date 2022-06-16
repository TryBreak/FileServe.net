package bing

import (
	"math/rand"
	"strconv"
	"time"

	"FileServe.net/server/global/config"
	"github.com/gofiber/fiber/v2"
)

func GetBZ(c *fiber.Ctx) error {
	idx := c.Query("idx")
	fileUrl := getFileName(idx, config.BingImg)

	return c.Redirect(fileUrl)
}

func getFileName(str string, fileArr []config.BingImgType) string {
	num, _ := strconv.Atoi(str) // 错误的值会返回 0
	max := len(fileArr)
	rNum := num - 1
	if num < 1 {
		rand.Seed(time.Now().Unix())
		rNum = rand.Intn(len(fileArr))
	}
	if num > max {
		rNum = max
	}
	return fileArr[rNum].Path
}

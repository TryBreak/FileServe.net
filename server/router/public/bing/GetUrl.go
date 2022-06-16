package bing

import (
	"FileServe.net/server/global/config"
	"FileServe.net/server/router/result"
	"github.com/gofiber/fiber/v2"
)

func GetUrl(c *fiber.Ctx) error {
	return c.JSON(result.OK.WithData(config.BingImg))
}

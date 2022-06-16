package public

import (
	"github.com/gofiber/fiber/v2"
)

func MiddleWare(c *fiber.Ctx) error {
	c.Set("Data-Type", "FileServe.net/api/public")

	// 授权验证
	// err := midst.EncryptAuth(c)
	// if err != nil {
	// 	return c.JSON(result.ErrApiAuth.WithData(mStr.ToStr(err)))
	// }

	return c.Next()
}

package private

import (
	"FileServe.net/server/router/midst"
	"FileServe.net/server/router/private/userInfo"
	"github.com/gofiber/fiber/v2"
)

/*

/api/private

*/
func Router(api fiber.Router) {
	r := api.Group("/private", MiddleWare)

	r.Get("/get_user_info", userInfo.GetUserInfo) //

	r.Get("/ping", midst.Ping)
	r.Post("/ping", midst.Ping)
}

package public

import (
	"FileServe.net/server/router/midst"
	"FileServe.net/server/router/public/bing"
	"FileServe.net/server/router/public/userInfo"
	"github.com/gofiber/fiber/v2"
)

/*
/api/public
*/
func Router(api fiber.Router) {
	r := api.Group("/public", MiddleWare)

	r.Post("/login", userInfo.Login)

	r.Get("/url", bing.GetUrl)
	r.Get("/bz", bing.GetBZ)

	r.Get("/ping", midst.Ping)
	r.Post("/ping", midst.Ping)
}

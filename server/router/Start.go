package router

import (
	"os"
	"time"

	"FileServe.net/server/global"
	"FileServe.net/server/global/config"
	"FileServe.net/server/router/midst"
	"FileServe.net/server/router/private"
	"FileServe.net/server/router/public"
	"github.com/EasyGolang/goTools/mStr"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/favicon"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Start() {
	// 加载日志文件
	fileName := config.Dir.Log + "/HTTP-" + time.Now().Format("06年1月02日15时") + ".log"
	logFile, _ := os.Create(fileName)

	// 创建服务
	app := fiber.New(fiber.Config{
		ServerHeader: "FileServe.net",
	})
	// 跨域
	app.Use(cors.New())

	// 限流
	app.Use(limiter.New(limiter.Config{
		Max:        20,
		Expiration: 20 * time.Second,
	}))

	// 日志中间件
	app.Use(logger.New(logger.Config{
		Format:     "[${time}] [${ip}:${port}] ${status} - ${method} ${latency} ${path} \n",
		TimeFormat: "2006-01-02 - 15:04:05",
		Output:     logFile,
	}), midst.Public, compress.New(), favicon.New())

	// api
	api := app.Group("/api")
	api.Get("/ping", midst.Ping)
	api.Post("/ping", midst.Ping)

	// public
	public.Router(api)

	// private
	private.Router(api)

	listenHost := mStr.Join(":", config.AppInfo.Port)
	global.Log.Println(mStr.Join(`启动服务: http://127.0.0.1`, listenHost))
	app.Listen(listenHost)
}

package ready

import (
	"time"

	"FileServe.net/server/ready/bingData"
	"github.com/EasyGolang/goTools/mCycle"
)

func Start() {
	mCycle.New(mCycle.Opt{
		Func:      GetBingImg,
		SleepTime: time.Hour * 4,
	}).Start()
}

func GetBingImg() {
	bingData.Start()
}

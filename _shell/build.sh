#!/bin/bash
# 加载变量
source "./_shell/init.sh"
#############

echo " =========== 编译 go 文件 =========== "

go mod tidy &&
  go build -o ${buildName}
echo "编译 完成"

echo " =========== 开始进行 文件整理 =========== "

echo "移动 goRun 文件"
mv ${buildName} ${outPutPath} &&
  exit

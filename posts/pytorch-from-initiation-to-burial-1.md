---
title: "pytorch 从入门到入土-1"
date: "2023-02-18"
---

# pytorch 从入门到入土-1

## pytorch 目录结构

目前版本（2.0.0a0）
主要的目录如下:
* c10 - 基础的Tensor库，只提供最基础的功能。
* aten - C++ tensor library(no autograd support)
    * src
        * ATen
            * core - ATen的核心文件，正在缓慢向c10迁移
            * native - 主要的算子位置，大部分CPU算子直接放在这里
                * cpu
                * cuda
                * sparse
                * mkl mkldnn miopen cudnn
              which simply bind to some backend library.
  * quantized - Quantized tensor (i.e. QTensor) operation implementations. 
* torch - python 前端，我们 `import torch as tf` 的就是这个目录
    * csrc - 主要是c++的python binding
        * jit -TorchScript JIT
        * autograd - 自动微分
        * api - c++前端
        * distributed - 分布式支持
* tools - 一些代码生成脚本
* test - Python前端的单元测试
    * test_torch.py - Pytorch 功能的基础测试
    * test_autograd.py - 自动微分测试
    * test_nn.py - NN算子和自动微分的测试
    * test_jit.py - JIT和TorchScript的测试
    * ...
    * cpp - C++前端的单元测试
        * api
        * jit
        * tensorexpr
    * expect - 自动生成的目标文件
    * onnx - ONNX相关测试文件
* caffe2 - The Caffe2 library.
    * core - Caffe2的核心文件
    * operators - Caff2的算子
    * python - Python bindings
    * ...
* .circleci - CircleCI 的配置文件

## 如何编译

看了这么多目录，我们就编译一下pytorch吧，这里以linux为例写一下过程，其实pytorch的README已经写过了

首先我们需要准备一个conda环境，这里使用的是mamba，一个速度很快的conda平替，使用conda或者miniconda也是一样的

1. 首先要做的当然是 clone 下所有的源代码，这个大家肯定都会

```bash
git clone --recursive https://github.com/pytorch/pytorch
cd pytorch
git checkout v2.0.0-rc1
git submodule sync
git submodule update --init --recursive
```

2. 安装相应的包

```bash
conda install cmake ninja
# 可以安装clangxx作为编译器，但是我没尝试，因为系统有gcc了
pip install -r requirements.txt
# 随手装个mkl吧
conda install mkl mkl-include
```

3. 安装

```bash
export CMAKE_PREFIX_PATH=${CONDA_PREFIX:-"$(dirname $(which conda))/../"}
python setup.py develop
```

等待大概1个小时（或者更多？）的时间，就可以编译完成了。

## 开胃菜
编译过程中，我们也别闲着，先看一道开胃菜吧！
让我们来看看检查pytorch版本的代码。

```python
import torch
print(torch.__version__)
```

这里的 `torch.__version__` 应该去哪里找呢？熟悉 python 的同学肯定知道是在`__init__.py`里，
我们进入`__init__.py`，发现了几行代码

```python
# TODO(torch_deploy) figure out how to freeze version.py in fbcode build
if sys.executable == 'torch_deploy':
    __version__ = "torch-deploy-1.8"
else:
    from .torch_version import __version__ as __version__
```
好的，去`torch_version`里找

打开`torch_version`，里边的

```python
from .version import __version__ as internal_version # 第二行
__version__ = TorchVersion(internal_version) # 89行
```

继续返回到根目录，怎么没有`.version.py`文件呢？
回想我们刚才介绍的目录结构，`pytorch/tools`存放了许多的代码生成脚本
，没错，`version.py`就是我们在编译时生成的。 让我们一起打开看看吧。

首先是两个函数`get_sha`与`get_tag`，这里没有使用 GitPython 这样的库，而是直接在`subprocess`中
执行 `git rev-parse HEAD` 和 `git describe --tags --exact`，没什么好说的，小伙伴们也可以在
当前目录试一下这两个命令。

接着看后面`if __name__ == "__main__":`的逻辑，首先读了`--is-debug`参数，然后是
`cuda_version ` 与 `hip_version` ，随后我们获取 git tag，如果拿不到 tag，就使用sha，
最后把相关信息写入到`version.py`中。

最后来看`TorchVersion`,这是个很巧妙的设计，在比较早的版本中，`__version__`被设计成了字符串，
比如`'1.2.1'`,在直接比较时,`'1.4.0'>'1.2.1'`是没有问题的，然而当序号上升到两位数后，
`'1.10.0'>'1.2.1' == False`,所以pytorch 把字符串用`TorchVersion`这个类包装了一下，来保证
这种比较不会出现问题。这里设计的很巧妙，我们详细看下。

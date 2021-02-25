# WordsDoc2

## 新文件格式：.wd2

.wd2使用空行（\n\n）将各个单词的内容分割开来。

使用三横线行（---\n）将每个单词内部划分为五个部分：单词、解释、注释（可选）、链接（可选）、相关单词（可选）

解释部分，对于各个含义的解释，使用三点行（...\n）进行分割，每个解释又包含多行，使用换行符（\n）分割。第一行为解释，之后的行为例句。解释行内部使用双斜线（//）分割，可分割为2-3部分，分别是(单词)//词性//解释。

注释部分，每次换行之后的内容会在渲染中被视为是单独的段落，放置到一个<p></p>中。

链接部分，各个链接使用换行符分割，每个链接内部包括链接名称和链接地址两个部分，用三个冒号:::符号分割。

相关单词部分，各个单词使用换行符进行分割。

示例：

```wd2
stepwells
---
n//印度阶梯井
---
印度的蓄水建筑

bygone era
---
bygone//adj//很久以前的、以往的
...
bygone//n//很久以前的（不愉快的）事
---
---
Merriam Webster:::https://www.merriam-webster.com/dictionary/bygone

elaborate
---
adj//复杂的、详尽的、精心制作的
...
v//详尽的阐述、精心的制作
---
---
---
intricately
```

没有注释、链接、或相关单词时，使用连续两个三横线行即可，如果之后没有内容，最后一行不留三横线。

输入文件使用CRLF或LF均可，所有的`\r\n`都会被转换为`\n`然后进行解析。

## CLI

`wd2 inputFilePath [outFilePath]`，输入文件名后缀应为`.wd2`，输出文件名为`.html`。

## 注意

打开输出文件需要网络连接以加载React和Babel。

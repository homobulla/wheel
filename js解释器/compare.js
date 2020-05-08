/*
 * @Author: your name
 * @Date: 2020-04-02 18:15:39
 * @LastEditTime: 2020-04-03 15:52:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wheel\js解释器\compare.js
 */

//  整体的流程
function compiler(input) {
    let tokens = tokenizer(input);
    let ast = parse(tokens);
    let newAst = transformer(ast);
    let output = codeGenerator(newAst);
    return output;
}

// 词法分析器
function tokenizerMy(input) {
    let current = 0;
    let tokens = [];
    while (current < input.length) {
        let char = input[current];
        if (char === '(' || char === ')') {
            tokens.push({
                type: 'paren',
                value: char
            });
            current++;
            continue;
        }
        // 空白字符
        const WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }
        const NUMBERS = /[0-9]/;
        if (NUMBERS.test(char)) {
            let value = '';
            // 连续数字，比如20
            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({
                type: 'number',
                value
            });
            continue;
        }
        // 函数名
        const FUNNAME = /[a-z]/i; // 忽略大小写，纯英文
        if (FUNNAME.test(char)) {
            let value = '';
            while (FUNNAME.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({
                type: 'name',
                value
            });
            continue;
        }
        // 其他字符
        thrownewTypeError('I dont know what this character is: ' + char);
    }
    return tokens;
}
function tokenizer(input) {
    let current = 0; // 当前解析的字符索引，作为游标
    let tokens = []; // 初始化词法单元数组
    // 循环遍历原始代码字符串，读取词法单元数组
    while (current < input.length) {
        let char = input[current];
        // 匹配左括号，匹配成功则压入对象 {type: 'paren', value:'('}
        if (char === '(') {
            tokens.push({
                type: 'paren',
                value: '('
            });
            current++;
            continue; // 自增current，完成本次循环，进入下一个循环
        }
        // 匹配右括号，匹配成功则压入对象 {type: 'paren', value:')'}
        if (char === ')') {
            tokens.push({
                type: 'paren',
                value: ')'
            });
            current++;
            continue;
        }

        // 匹配空白字符，匹配成功则跳过
        // 使用 \s 匹配，包括空格、制表符、换页符、换行符、垂直制表符等
        let WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }
        // 匹配数字字符，使用 [0-9]：匹配
        // 匹配成功则压入{type: 'number', value: value}
        // 如 (add 123 456) 中 123 和 456 为两个数值词法单元
        let NUMBERS = /[0-9]/;
        if (NUMBERS.test(char)) {
            let value = '';
            // 匹配连续数字，作为数值
            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({ type: 'number', value });
            continue;
        }
        // 匹配形双引号包围的字符串
        // 匹配成功则压入 { type: 'string', value: value }
        // 如 (concat "foo" "bar") 中 "foo" 和 "bar" 为两个字符串词法单元
        if (char === '"') {
            let value = '';
            char = input[++current]; // 跳过左双引号
            // 获取两个双引号之间所有字符
            while (char !== '"') {
                value += char;
                char = input[++current];
            }
            char = input[++current]; // 跳过右双引号
            tokens.push({ type: 'string', value });
            continue;
        }
        // 匹配函数名，要求只含大小写字母，使用 [a-z] 匹配 i 模式
        // 匹配成功则压入 { type: 'name', value: value }
        // 如 (add 2 4) 中 add 为一个名称词法单元
        let LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
            let value = '';
            // 获取连续字符
            while (LETTERS.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({ type: 'name', value });
            continue;
        }
        // 当遇到无法识别的字符，抛出错误提示，并退出
        throw new TypeError('I dont know what this character is: ' + char);
    }
    // 词法分析器的最后返回词法单元数组
    return tokens;
}

var ret = tokenizer('add(30  4)');
console.log(parse(ret));
// 语法分析器
function parse(tokens) {
    let current = 0; // 设置当前解析的词法单元的索引，作为游标
    // 递归遍历（因为函数调用允许嵌套），将词法单元转成 LISP 的 AST 节点
    function walk() {
        // 获取当前索引下的词法单元 token
        let token = tokens[current];

        // 数值类型词法单元
        console.log(current, token, 'token');
        if (token.type === 'number') {
            current++; // 自增当前 current 值
            // 生成一个 AST节点 'NumberLiteral'，表示数值字面量
            return {
                type: 'NumberLiteral',
                value: token.value
            };
        }

        // 字符串类型词法单元
        if (token.type === 'string') {
            current++;
            // 生成一个 AST节点 'StringLiteral'，表示字符串字面量
            return {
                type: 'StringLiteral',
                value: token.value
            };
        }
        // 字符串类型词法单元
        if (token.type === 'name') {
            current++;
            // 生成一个 AST节点 'StringLiteral'，表示字符串字面量
            return {
                type: 'NameLiteral',
                value: token.value
            };
        }
        // 函数类型词法单元
        if (token.type === 'paren' && token.value === '(') {
            // 跳过左括号，获取下一个词法单元作为函数名
            token = tokens[++current];

            let node = {
                type: 'CallExpression',
                name: token.value,
                params: []
            };

            // 再次自增 current 变量，获取参数词法单元
            // token = tokens[++current];

            // 遍历每个词法单元，获取函数参数，直到出现右括号"）"
            while (token.type !== 'paren' || (token.type === 'paren' && token.value !== ')')) {
                node.params.push(walk());
                token = tokens[current];
            }

            current++; // 跳过右括号
            return node;
        }
        // 无法识别的字符，抛出错误提示
        throw new TypeError(token.type);
    }

    // 初始化 AST 根节点
    let ast = {
        type: 'Program',
        body: []
    };

    // 循环填充 ast.body
    while (current < tokens.length) {
        // console.log(current, 'current');
        ast.body.push(walk());
    }

    // 最后返回ast
    return ast;
}
// 生成新的AST
function transformer(ast) {}
// 代码生成器
function codeGenerator(newAst) {}

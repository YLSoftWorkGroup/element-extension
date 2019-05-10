function markdownConf() {
    const wrap = function(render) {
        return function() {
          return render.apply(this, arguments)
            .replace('<code v-pre class="', '<code class="hljs ')
            .replace('<code>', '<code class="hljs">')
        }
      }
    return {
        raw: true,
        preventExtract: false,
        use: [
                [ require('markdown-it-container'), 'demo', {
                validate: function(params) {
                    return params.trim().match(/^demo\s*(.*)$/)
                },
                render: function(tokens, index) {
                    let { nesting, info } = tokens[index]
                    if (nesting === 1) {
                    // 1.获取代码块的描述内容
                    let content = info.trim().match(/^demo\s+(.*)$/) || []
                    let description = content.length > 1 ? content[1] : ""
                    var md = require("markdown-it")()
                    if (description) {
                        description = md.render(description)
                    }
                    let code = tokens[index + 1].content
                    return `
                        <demo-code>
                            <div class="source" slot="source">${code}</div>
                            ${description}
                            <div class="highlight" slot="highlight">`
                    } else {
                    return `
                        </div>
                        </demo-code>\n`
                    }
                }
                }],
                [require('markdown-it-container'), 'tip'],
                [require('markdown-it-container'), 'warning'],
                [require('markdown-it-container'), 'danger'],
                [require('markdown-it-emoji')],
                [require('markdown-it-table-of-contents'),{
                    includeLevel: [2, 3]
                }],
                [require('markdown-it-anchor'), {
                    permalink: true,
                    permalinkBefore: true,
                        permalinkSymbol: '#'
                }],
            ],
        preprocess: function(MarkdownIt, source) {
        MarkdownIt.renderer.rules.table_open = function() {
            return '<table class="table-md">';
        };
        MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence)
        return source;
        }
    }
}

module.exports = markdownConf
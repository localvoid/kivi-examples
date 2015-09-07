// jstyle css

addEntry('main.css', new StyleSheet({
  rules: function(c) {
    return [
        select('.Grid', [
            prop('position', 'relative'),
            prop('margin', '10px')
        ]),

        select('.BoxRoot', [
            prop('position', 'relative'),
            prop('display', 'inline-block'),
            prop('width', '20px'),
            prop('height', '20px'),
            prop('margin', '8px')
        ]),

        select('.Box', [
            prop('position', 'absolute'),
            prop('width', '20px'),
            prop('height', '20px'),
            prop('border-radius', '50%'),
            prop('color', '#fff'),
            prop('text-align', 'center'),
            prop('line-height', '20px'),
            prop('font-size', '10px')
        ])
    ];
  }
}));

import parser from "../parser";

describe('LRX Parser', () => {
  it('Simple test', () => {
    (parser as any).parse('===', {
      startRule: 'LRXSeparator'
    });
  });
});

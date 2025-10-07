import { describe, it, expect, beforeEach } from 'vitest';
import Tput from '../../lib/tput.js';

describe('Tput', () => {
  describe('terminfo compiler', () => {
    let tput;

    beforeEach(() => {
      tput = new Tput({ terminal: 'xterm' });
    });

    describe('parameterized string compilation', () => {
      it('should handle simple parameter substitution', () => {
        const info = {
          name: 'test',
          names: ['test'],
          desc: 'Test terminal',
          bools: {},
          numbers: {},
          strings: {
            test_cap: '%p1%d'
          }
        };

        const compiled = tput.compile(info);
        const result = compiled.methods.test_cap([42]);

        expect(result).toBe('42');
      });

      it('should handle arithmetic operations', () => {
        const info = {
          name: 'test',
          names: ['test'],
          desc: 'Test terminal',
          bools: {},
          numbers: {},
          strings: {
            test_add: '%p1%p2%+%d',
            test_sub: '%p1%p2%-%d',
            test_mul: '%p1%p2%*%d',
            test_div: '%p1%p2%/%d',
            test_mod: '%p1%p2%m%d'
          }
        };

        const compiled = tput.compile(info);

        expect(compiled.methods.test_add([10, 5])).toBe('15');
        expect(compiled.methods.test_sub([10, 5])).toBe('5');
        expect(compiled.methods.test_mul([10, 5])).toBe('50');
        expect(compiled.methods.test_div([10, 3])).toBe('3');
        expect(compiled.methods.test_mod([10, 3])).toBe('1');
      });

      it('should perform integer division, not floating point', () => {
        const info = {
          name: 'test',
          names: ['test'],
          desc: 'Test terminal',
          bools: {},
          numbers: {},
          strings: {
            test_div: '%p1%p2%/%d'
          }
        };

        const compiled = tput.compile(info);

        // Without the fix, this would return floating point numbers
        expect(compiled.methods.test_div([10, 3])).toBe('3');
        expect(compiled.methods.test_div([7, 2])).toBe('3');
        expect(compiled.methods.test_div([65536, 256])).toBe('256');
        expect(compiled.methods.test_div([16744512, 65536])).toBe('255'); // 0xFF8040 / 0x10000
      });

      it('should output integers for %d format', () => {
        const info = {
          name: 'test',
          names: ['test'],
          desc: 'Test terminal',
          bools: {},
          numbers: {},
          strings: {
            test_cap: '%p1%d'
          }
        };

        const compiled = tput.compile(info);

        // Without the fix, floating point operations might produce decimals
        expect(compiled.methods.test_cap([42.7])).toBe('42');
        expect(compiled.methods.test_cap([3.14159])).toBe('3');
      });

      it('should handle bit operations', () => {
        const info = {
          name: 'test',
          names: ['test'],
          desc: 'Test terminal',
          bools: {},
          numbers: {},
          strings: {
            test_and: '%p1%p2%&%d',
            test_or: '%p1%p2%|%d',
            test_xor: '%p1%p2%^%d'
          }
        };

        const compiled = tput.compile(info);

        expect(compiled.methods.test_and([255, 15])).toBe('15');
        expect(compiled.methods.test_or([240, 15])).toBe('255');
        expect(compiled.methods.test_xor([255, 15])).toBe('240');
      });

      it('should handle if-then-else statements', () => {
        const info = {
          name: 'test',
          names: ['test'],
          desc: 'Test terminal',
          bools: {},
          numbers: {},
          strings: {
            test_if: '%?%p1%tTRUE%eFALSE%;'
          }
        };

        const compiled = tput.compile(info);

        expect(compiled.methods.test_if([1])).toBe('TRUE');
        expect(compiled.methods.test_if([0])).toBe('FALSE');
      });

      it('should handle nested if-then-else statements (else-if pattern)', () => {
        const info = {
          name: 'test',
          names: ['test'],
          desc: 'Test terminal',
          bools: {},
          numbers: {},
          strings: {
            // Proper else-if pattern: %?c1%tb1%ec2%tb2%eb3%;
            test_elseif: '%?%p1%tA%e%p2%tB%eC%;'
          }
        };

        const compiled = tput.compile(info);

        // First condition true
        expect(compiled.methods.test_elseif([1, 0])).toBe('A');
        // Second condition true
        expect(compiled.methods.test_elseif([0, 1])).toBe('B');
        // Neither condition true
        expect(compiled.methods.test_elseif([0, 0])).toBe('C');
      });

      it('should handle %; without matching %? (orphaned endif)', () => {
        // This is the key issue with Ghostty's Setulc - it has %; at the end
        // without a matching %? to start an if-statement
        const info = {
          name: 'test',
          names: ['test'],
          desc: 'Test terminal',
          bools: {},
          numbers: {},
          strings: {
            // %; at the end without %? - should be silently ignored
            test_orphan: 'foo%p1%dbar%;'
          }
        };

        const compiled = tput.compile(info);

        // Without the fix, this would throw a compilation error
        expect(() => compiled.methods.test_orphan([42])).not.toThrow();
        expect(compiled.methods.test_orphan([42])).toBe('foo42bar');
      });
    });

    describe('Ghostty Setulc capability', () => {
      it('should compile Ghostty Setulc capability without errors', () => {
        // This is the actual problematic capability from Ghostty's terminfo
        // Setulc=\E[58\:2\:\:%p1%{65536}%/%d\:%p1%{256}%/%{255}%&%d\:%p1%{255}%&%d%;m
        const info = {
          name: 'xterm-ghostty',
          names: ['xterm-ghostty'],
          desc: 'Ghostty terminal',
          bools: {},
          numbers: {},
          strings: {
            Setulc: '\\E[58\\:2\\:\\:%p1%{65536}%/%d\\:%p1%{256}%/%{255}%&%d\\:%p1%{255}%&%d%;m'
          }
        };

        // Without the fixes, this compilation would fail with:
        // "SyntaxError: Unexpected identifier 'out'"
        let compiled;
        expect(() => {
          compiled = tput.compile(info);
        }).not.toThrow();

        expect(compiled.methods.Setulc).toBeDefined();
        expect(typeof compiled.methods.Setulc).toBe('function');
      });

      it('should correctly decode RGB values from single integer in Setulc', () => {
        const info = {
          name: 'xterm-ghostty',
          names: ['xterm-ghostty'],
          desc: 'Ghostty terminal',
          bools: {},
          numbers: {},
          strings: {
            // Setulc decodes RGB from a 24-bit integer:
            // R = color / 65536
            // G = (color / 256) & 255
            // B = color & 255
            Setulc: '\\E[58\\:2\\:\\:%p1%{65536}%/%d\\:%p1%{256}%/%{255}%&%d\\:%p1%{255}%&%d%;m'
          }
        };

        const compiled = tput.compile(info);

        // Test RGB(255, 128, 64) = 0xFF8040 = 16744512
        const result = compiled.methods.Setulc([0xFF8040]);
        expect(result).toMatch(/\x1b\[58:2::/);
        expect(result).toMatch(/255:128:64m/);

        // Test pure red: RGB(255, 0, 0) = 0xFF0000
        const red = compiled.methods.Setulc([0xFF0000]);
        expect(red).toMatch(/255:0:0m/);

        // Test pure green: RGB(0, 255, 0) = 0x00FF00
        const green = compiled.methods.Setulc([0x00FF00]);
        expect(green).toMatch(/0:255:0m/);

        // Test pure blue: RGB(0, 0, 255) = 0x0000FF
        const blue = compiled.methods.Setulc([0x0000FF]);
        expect(blue).toMatch(/0:0:255m/);

        // Test white: RGB(255, 255, 255) = 0xFFFFFF
        const white = compiled.methods.Setulc([0xFFFFFF]);
        expect(white).toMatch(/255:255:255m/);
      });

      it('should handle double colons in escape sequences', () => {
        // The double colon \:2\:: in Setulc is intentional and represents
        // the SGR format: ESC[58:2::R:G:Bm where :: is an empty parameter
        const info = {
          name: 'test',
          names: ['test'],
          desc: 'Test terminal',
          bools: {},
          numbers: {},
          strings: {
            // This has multiple colons including ::
            test_colon: '\\E[58\\:2\\:\\:%p1%d'
          }
        };

        const compiled = tput.compile(info);
        const result = compiled.methods.test_colon([42]);

        // The \: in terminfo is an escaped colon, should become literal :
        expect(result).toBe('\x1b[58:2::42');
      });
    });

    describe('edge cases', () => {
      it('should handle empty strings', () => {
        const info = {
          name: 'test',
          names: ['test'],
          desc: 'Test terminal',
          bools: {},
          numbers: {},
          strings: {
            empty: ''
          }
        };

        const compiled = tput.compile(info);
        expect(compiled.methods.empty([])).toBe('');
      });

      it('should handle strings with only literal text', () => {
        const info = {
          name: 'test',
          names: ['test'],
          desc: 'Test terminal',
          bools: {},
          numbers: {},
          strings: {
            literal: 'hello world'
          }
        };

        const compiled = tput.compile(info);
        expect(compiled.methods.literal([])).toBe('hello world');
      });

      it('should handle escape sequences', () => {
        const info = {
          name: 'test',
          names: ['test'],
          desc: 'Test terminal',
          bools: {},
          numbers: {},
          strings: {
            esc: '\\E[0m'
          }
        };

        const compiled = tput.compile(info);
        expect(compiled.methods.esc([])).toBe('\x1b[0m');
      });

      it('should handle complex parameterized strings', () => {
        const info = {
          name: 'test',
          names: ['test'],
          desc: 'Test terminal',
          bools: {},
          numbers: {},
          strings: {
            // Multiple operations on same parameter
            complex: '%p1%{10}%/%d:%p1%{10}%m%d'
          }
        };

        const compiled = tput.compile(info);
        // 42 / 10 = 4, 42 % 10 = 2
        expect(compiled.methods.complex([42])).toBe('4:2');
      });

      it('should preserve multiple semicolons in valid if-statements', () => {
        const info = {
          name: 'test',
          names: ['test'],
          desc: 'Test terminal',
          bools: {},
          numbers: {},
          strings: {
            // Properly nested if-statements with multiple %;
            nested: '%?%p1%tA%;%?%p2%tB%;'
          }
        };

        const compiled = tput.compile(info);
        expect(compiled.methods.nested([1, 1])).toBe('AB');
        expect(compiled.methods.nested([1, 0])).toBe('A');
        expect(compiled.methods.nested([0, 1])).toBe('B');
        expect(compiled.methods.nested([0, 0])).toBe('');
      });
    });

    describe('real-world terminfo capabilities', () => {
      it('should compile xterm set_attributes (sgr) capability', () => {
        const info = {
          name: 'xterm',
          names: ['xterm'],
          desc: 'xterm terminal',
          bools: {},
          numbers: {},
          strings: {
            // This is xterm's actual sgr (set_attributes) capability
            set_attributes: '%?%p9%t\\E(0%e\\E(B%;\\E[0%?%p6%t;1%;%?%p2%t;4%;%?%p1%p3%|%t;7%;%?%p4%t;5%;%?%p7%t;8%;m'
          }
        };

        let compiled;
        expect(() => {
          compiled = tput.compile(info);
        }).not.toThrow();

        expect(compiled.methods.set_attributes).toBeDefined();

        // Test with various attribute combinations
        // sgr(standout, underline, reverse, blink, dim, bold, invis, protect, altcharset)
        const result = compiled.methods.set_attributes([0, 0, 0, 0, 0, 1, 0, 0, 0]); // bold only
        expect(result).toContain('\x1b[0');
        expect(result).toContain(';1');
      });

      it('should compile screen cursor_address capability', () => {
        const info = {
          name: 'screen',
          names: ['screen'],
          desc: 'screen terminal',
          bools: {},
          numbers: {},
          strings: {
            // cursor_address with %i (increment parameters)
            cursor_address: '\\E[%i%p1%d;%p2%dH'
          }
        };

        const compiled = tput.compile(info);
        // Move to row 5, col 10 (but %i increments both to 6 and 11)
        const result = compiled.methods.cursor_address([5, 10]);
        expect(result).toBe('\x1b[6;11H');
      });
    });
  });

  describe('sprintf function', () => {
    it('should format integers with %d', () => {
      expect(Tput.sprintf('%d', 42)).toBe('42');
      expect(Tput.sprintf('%d', -42)).toBe('-42');
    });

    it('should format hex with %x', () => {
      expect(Tput.sprintf('%x', 255)).toBe('ff');
      expect(Tput.sprintf('%X', 255)).toBe('FF');
    });

    it('should format octal with %o', () => {
      expect(Tput.sprintf('%o', 8)).toBe('10');
    });

    it('should format strings with %s', () => {
      expect(Tput.sprintf('%s', 'hello')).toBe('hello');
    });

    it('should format characters with %c', () => {
      expect(Tput.sprintf('%c', 65)).toBe('A');
      expect(Tput.sprintf('%c', 0x41)).toBe('A');
    });

    it('should handle multiple format specifiers', () => {
      expect(Tput.sprintf('%d:%d:%d', 255, 128, 64)).toBe('255:128:64');
    });

    it('should handle width specifiers', () => {
      expect(Tput.sprintf('%2d', 5)).toBe('05');
      expect(Tput.sprintf('%3d', 42)).toBe('042');
    });
  });
});
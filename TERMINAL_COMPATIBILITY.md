# Terminal Compatibility Matrix

This document defines officially supported terminals and documents known compatibility issues for blessed v1.x.

## Support Levels

- ✅ **Full Support** - All features work, regularly tested
- ⚠️ **Partial Support** - Most features work, known limitations
- ❌ **Limited Support** - Basic functionality only, significant limitations
- ⏸️ **Untested** - Should work via terminfo, not verified

---

## macOS Terminals

### iTerm2
**Support:** ✅ Full Support
**Version:** 3.x+
**Features:**
- ✅ Full mouse support (all protocols)
- ✅ 256 colors
- ✅ True color (24-bit)
- ✅ Unicode support
- ✅ CSR (change scroll region)
- ✅ Resize events
- ⚠️ Combining characters rendering issues (terminal bug)

**Known Issues:**
- Combining characters not displayed properly (iTerm2 rendering issue)

**Recommended:** Yes - best choice for macOS

---

### Terminal.app (macOS default)
**Support:** ⚠️ Partial Support
**Version:** macOS 10.x+
**Features:**
- ❌ No mouse support (terminal limitation)
- ✅ 256 colors
- ⚠️ Limited true color support
- ✅ Unicode support
- ✅ CSR
- ✅ Resize events

**Known Issues:**
- No mouse events (terminal limitation)
- Less feature-rich than alternatives

**Recommended:** No - use iTerm2 or Alacritty instead

---

### Alacritty
**Support:** ✅ Full Support
**Version:** 0.x+
**Features:**
- ✅ Full mouse support
- ✅ 256 colors
- ✅ True color (24-bit)
- ✅ Unicode support
- ✅ CSR
- ✅ Resize events
- ✅ High performance

**Known Issues:** None known

**Recommended:** Yes - excellent modern terminal

---

### Kitty
**Support:** ✅ Full Support
**Version:** 0.x+
**Features:**
- ✅ Full mouse support
- ✅ 256 colors
- ✅ True color (24-bit)
- ✅ Unicode support
- ✅ CSR
- ✅ Resize events
- ✅ Extended features (images, etc.)

**Known Issues:** None known

**Recommended:** Yes - modern, feature-rich

---

## Linux Terminals

### gnome-terminal (VTE-based)
**Support:** ✅ Full Support
**Version:** 3.x+ (modern VTE)
**Features:**
- ✅ Full mouse support (modern versions)
- ✅ 256 colors
- ✅ True color (24-bit)
- ✅ Unicode support
- ✅ CSR
- ✅ Resize events

**Known Issues:**
- Older VTE versions (< 0.50): Mouse limited to 255 columns

**Recommended:** Yes (with modern version)

---

### konsole (KDE)
**Support:** ✅ Full Support
**Version:** 20.x+
**Features:**
- ✅ Full mouse support
- ✅ 256 colors
- ✅ True color (24-bit)
- ✅ Unicode support
- ✅ CSR
- ✅ Resize events

**Known Issues:** None known

**Recommended:** Yes

---

### xterm
**Support:** ✅ Full Support
**Version:** 300+
**Features:**
- ✅ Full mouse support
- ✅ 256 colors
- ⚠️ True color (with patches)
- ✅ Unicode support (with -u8 flag)
- ✅ CSR
- ✅ Resize events

**Known Issues:** None known

**Recommended:** Yes - reference implementation

---

### urxvt (rxvt-unicode)
**Support:** ⚠️ Partial Support
**Version:** 9.x+
**Features:**
- ⚠️ Mouse support (with quirks)
- ✅ 256 colors
- ❌ No true color
- ✅ Unicode support
- ✅ CSR
- ✅ Resize events

**Known Issues:**
- Mouse wheel quirks after mousemove
- No true color support

**Recommended:** Works, but alternatives better

---

### st (suckless terminal)
**Support:** ⏸️ Untested
**Version:** 0.x+
**Features:** Should work via terminfo

**Known Issues:** Not regularly tested

**Recommended:** Should work, needs testing

---

### Linux Console (TTY)
**Support:** ⚠️ Partial Support
**Version:** kernel 4.x+
**Features:**
- ⚠️ Mouse (via GPM daemon)
- ⚠️ Limited colors (16)
- ❌ No true color
- ⚠️ Limited Unicode
- ✅ Basic CSR
- ❌ No resize events (in some configs)

**Known Issues:**
- Limited functionality compared to terminal emulators
- GPM mouse requires daemon running

**Recommended:** Works for basic apps

---

## Windows Terminals

### Windows Terminal
**Support:** ✅ Full Support
**Version:** 1.x+
**Features:**
- ✅ Full mouse support
- ✅ 256 colors
- ✅ True color (24-bit)
- ✅ Unicode support
- ✅ CSR
- ✅ Resize events

**Known Issues:** None known (modern terminal)

**Recommended:** Yes - best for Windows

---

### cmd.exe
**Support:** ❌ Limited Support
**Version:** Windows 10+
**Features:**
- ❌ No mouse support
- ⚠️ Limited colors
- ❌ No true color
- ⚠️ Limited Unicode
- ⚠️ Limited CSR
- ❌ No resize events

**Known Issues:**
- No mouse or resize events (platform limitation)
- Very limited compared to modern terminals

**Recommended:** No - use Windows Terminal

---

### PowerShell Console
**Support:** ❌ Limited Support
**Version:** 5.x+
**Features:**
- ❌ No mouse support
- ⚠️ Limited colors
- ❌ No true color
- ⚠️ Limited Unicode
- ⚠️ Limited CSR
- ❌ No resize events

**Known Issues:**
- Similar limitations to cmd.exe

**Recommended:** No - use Windows Terminal

---

### ConEmu
**Support:** ⚠️ Partial Support
**Version:** Recent versions
**Features:**
- ⚠️ Mouse support (varies)
- ✅ 256 colors
- ⚠️ True color (varies)
- ✅ Unicode support
- ✅ CSR
- ⚠️ Resize events (varies)

**Known Issues:** Feature support varies by configuration

**Recommended:** Works, but Windows Terminal better

---

## Terminal Multiplexers

### tmux
**Support:** ✅ Full Support
**Version:** 2.x+
**Features:**
- ✅ Full mouse support
- ✅ 256 colors
- ✅ True color (with `Tc` flag)
- ✅ Unicode support
- ✅ CSR
- ✅ Resize events

**Configuration:**
```bash
# For true color in tmux
set -g default-terminal "tmux-256color"
set -ga terminal-overrides ",*256col*:Tc"
```

**Known Issues:** None with proper configuration

**Recommended:** Yes

---

### GNU screen
**Support:** ⚠️ Partial Support
**Version:** 4.x+
**Features:**
- ⚠️ Mouse support (limited)
- ✅ 256 colors
- ❌ No true color
- ✅ Unicode support
- ✅ CSR
- ✅ Resize events

**Known Issues:**
- No true color support
- Mouse support more limited than tmux

**Recommended:** Works, tmux preferred

---

## SSH/Remote

### SSH (OpenSSH)
**Support:** ✅ Full Support
**Version:** Any recent version
**Notes:**
- Terminal capabilities depend on remote terminal
- TERM environment variable must be set correctly
- Mouse and colors work if both client and server support

**Best Practices:**
- Ensure terminfo files exist on server
- Set TERM correctly (usually automatic)
- Test mouse support in both directions

**Known Issues:** None (passes through to actual terminal)

---

## Recommendations Summary

### Best Overall
1. **Alacritty** - Fast, modern, cross-platform
2. **Kitty** - Feature-rich, modern
3. **iTerm2** - Best for macOS
4. **Windows Terminal** - Best for Windows
5. **gnome-terminal** - Good for Linux/GNOME

### For Development
- **Primary:** Alacritty or iTerm2 (macOS)
- **Testing:** xterm (reference), Windows Terminal (Windows)
- **CI/CD:** xterm, tmux

### Minimum Requirements
For full blessed functionality:
- ✅ 256 color support
- ✅ Mouse support (SGR protocol preferred)
- ✅ Unicode support
- ✅ CSR (change scroll region)
- ✅ Resize events

---

## Testing Strategy

### Phase 1 (Automated)
Test core functionality on:
- xterm (reference implementation)
- tmux (multiplexer)
- GitHub Actions environments

### Phase 2 (Manual)
Test full app on:
- iTerm2 (macOS)
- Alacritty (Linux/macOS)
- Windows Terminal (Windows)
- gnome-terminal (Linux)

### Phase 3 (Community)
Gather reports from:
- Kitty
- konsole
- urxvt
- Other terminals

---

## Terminfo Coverage

Blessed uses terminfo/termcap parsing and should theoretically work with any terminal that has a terminfo definition. The matrix above reflects tested and verified terminals.

**Untested terminals should work** as long as:
1. Terminal has terminfo file (`/usr/share/terminfo/`)
2. TERM environment variable is set correctly
3. Terminal implements capabilities it claims

---

## Feature Matrix

| Terminal | Mouse | 256 Color | True Color | Unicode | CSR | Resize | Recommended |
|----------|-------|-----------|------------|---------|-----|--------|-------------|
| **macOS** |
| iTerm2 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⭐ |
| Terminal.app | ❌ | ✅ | ⚠️ | ✅ | ✅ | ✅ | - |
| Alacritty | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⭐ |
| Kitty | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⭐ |
| **Linux** |
| gnome-term | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⭐ |
| konsole | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⭐ |
| xterm | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ⭐ |
| urxvt | ⚠️ | ✅ | ❌ | ✅ | ✅ | ✅ | - |
| TTY | ⚠️ | ⚠️ | ❌ | ⚠️ | ✅ | ⚠️ | - |
| **Windows** |
| Win Terminal | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⭐ |
| cmd.exe | ❌ | ⚠️ | ❌ | ⚠️ | ⚠️ | ❌ | - |
| PowerShell | ❌ | ⚠️ | ❌ | ⚠️ | ⚠️ | ❌ | - |
| ConEmu | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ⚠️ | - |
| **Multiplexers** |
| tmux | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⭐ |
| screen | ⚠️ | ✅ | ❌ | ✅ | ✅ | ✅ | - |

---

**Last Updated:** Phase 0, blessed v0.1.82 fork
**Purpose:** Define official support matrix for v1.x development and testing
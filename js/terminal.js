/**
 * Consola / Terminal del Sistema (Fase 1)
 * Se activa al presionar el botón de cerrar (X) en la barra superior.
 */
(function () {
  'use strict';

  const terminalOverlay = document.getElementById('system-terminal');
  const terminalBody = document.getElementById('terminal-body');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const btnOpenTerminal = document.getElementById('btn-win-close');
  const btnExitTerminal = document.getElementById('btn-terminal-exit');

  if (!terminalOverlay || !terminalOutput || !terminalForm || !terminalInput) {
    return;
  }

  const PROMPT_TEXT = 'lucas@portfolio:~$';
  const commandHistory = [];
  let historyIndex = -1;
  let lastFocusedElement = null;

  function appendLine(text, variant) {
    const line = document.createElement('div');
    line.className = 'terminal-line' + (variant ? ' terminal-line--' + variant : '');
    line.textContent = text;
    terminalOutput.appendChild(line);
    scrollToBottom();
  }

  function appendCommandEcho(rawCommand) {
    const line = document.createElement('div');
    line.className = 'terminal-line terminal-line--command';

    const promptSpan = document.createElement('span');
    promptSpan.className = 'terminal-prompt-label';
    promptSpan.textContent = PROMPT_TEXT + ' ';

    line.appendChild(promptSpan);
    line.appendChild(document.createTextNode(rawCommand));
    terminalOutput.appendChild(line);
  }

  function scrollToBottom() {
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  function printWelcome() {
    terminalOutput.innerHTML = '';
    appendLine('LUCAS OS [Versión 1.0.0]', 'system');
    appendLine('(c) Lucas Peralta — Modo consola del sistema.', 'muted');
    appendLine("Escribí 'help' para ver los comandos disponibles o 'portfolio.exe' para volver.", 'muted');
  }

  function openTerminal() {
    lastFocusedElement = document.activeElement;
    terminalOverlay.hidden = false;
    document.body.classList.add('is-terminal-open');

    if (terminalOutput.children.length === 0) {
      printWelcome();
    }

    setTimeout(function () {
      terminalInput.focus();
      scrollToBottom();
    }, 30);
  }

  function closeTerminal() {
    terminalOverlay.hidden = true;
    document.body.classList.remove('is-terminal-open');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  const commands = {
    help: function () {
      appendLine('Comandos disponibles:', 'system');
      appendLine('  help           Muestra esta lista de comandos.');
      appendLine('  whoami         Información rápida sobre Lucas Peralta.');
      appendLine('  ls             Lista los archivos y secciones del sistema.');
      appendLine('  clear / cls    Limpia la pantalla de la consola.');
      appendLine('  portfolio.exe  Cierra la consola y vuelve al portfolio.');
      appendLine('  exit           Alias de portfolio.exe.');
      appendLine('');
      appendLine('Tip: Próximamente se habilitarán comandos secretos...', 'muted');
    },
    whoami: function () {
      appendLine('Lucas Peralta — Desarrollador de Software (Castelli, Buenos Aires).', 'system');
      appendLine('Intereses: desarrollo web, sistemas de gestión y videojuegos.', 'muted');
    },
    ls: function () {
      appendLine('index.html   proyectos.html   README.md   secretos/', 'system');
    },
    clear: function () {
      terminalOutput.innerHTML = '';
    },
    cls: function () {
      terminalOutput.innerHTML = '';
    },
    'portfolio.exe': function () {
      appendLine('Iniciando portfolio.exe...', 'system');
      setTimeout(closeTerminal, 180);
    },
    exit: function () {
      closeTerminal();
    }
  };

  function handleCommand(rawInput) {
    const trimmed = rawInput.trim();
    appendCommandEcho(trimmed);

    if (!trimmed) {
      scrollToBottom();
      return;
    }

    commandHistory.push(trimmed);
    historyIndex = commandHistory.length;

    const cmdName = trimmed.split(/\s+/)[0].toLowerCase();
    const action = commands[cmdName];

    if (action) {
      action();
    } else {
      appendLine("Comando no reconocido: '" + cmdName + "'. Escribí 'help' para ver la lista.", 'error');
    }

    scrollToBottom();
  }

  if (btnOpenTerminal) {
    btnOpenTerminal.addEventListener('click', openTerminal);
  }

  if (btnExitTerminal) {
    btnExitTerminal.addEventListener('click', closeTerminal);
  }

  terminalForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const value = terminalInput.value;
    terminalInput.value = '';
    handleCommand(value);
  });

  if (terminalBody) {
    terminalBody.addEventListener('click', function () {
      terminalInput.focus();
    });
  }

  terminalInput.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex -= 1;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex += 1;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !terminalOverlay.hidden) {
      closeTerminal();
    }
  });
})();


document.addEventListener('DOMContentLoaded', () => {
    const profileNameDisplay = document.getElementById('profile-name-display');
    const profileNameInput = document.getElementById('profile-name-input');
    const profileEmailDisplay = document.getElementById('profile-email-display');
    const profileEmailInput = document.getElementById('profile-email-input');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const saveProfileBtn = document.getElementById('save-profile-btn');

    const updateProfileDisplay = () => {
        profileNameDisplay.textContent = profileNameInput.value.trim();
        profileEmailDisplay.textContent = profileEmailInput.value.trim();

        profileNameDisplay.style.display = 'inline';
        profileNameInput.style.display = 'none';
        profileEmailDisplay.style.display = 'block';
        profileEmailInput.style.display = 'none';

        editProfileBtn.style.display = 'block';
        saveProfileBtn.style.display = 'none';

        localStorage.setItem('profileName', profileNameDisplay.textContent);
        localStorage.setItem('profileEmail', profileEmailDisplay.textContent);
    };

    editProfileBtn.addEventListener('click', () => {
        profileNameDisplay.style.display = 'none';
        profileNameInput.style.display = 'inline';
        profileEmailDisplay.style.display = 'none';
        profileEmailInput.style.display = 'block';

        profileNameInput.value = profileNameDisplay.textContent.trim();
        profileEmailInput.value = profileEmailDisplay.textContent.trim();

        editProfileBtn.style.display = 'none';
        saveProfileBtn.style.display = 'block';
    });

    saveProfileBtn.addEventListener('click', updateProfileDisplay);

    const savedName = localStorage.getItem('profileName');
    const savedEmail = localStorage.getItem('profileEmail');
    if (savedName) {
        profileNameDisplay.textContent = savedName;
        profileNameInput.value = savedName;
    }
    if (savedEmail) {
        profileEmailDisplay.textContent = savedEmail;
        profileEmailInput.value = savedEmail;
    }

    const profilePic = document.getElementById('profile-pic');
    const uploadPicInput = document.getElementById('upload-pic');
    const changePicBtn = document.getElementById('change-pic-btn');

    changePicBtn.addEventListener('click', () => {
        uploadPicInput.click();
    });

    uploadPicInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePic.src = e.target.result;
                localStorage.setItem('profilePic', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    const savedProfilePic = localStorage.getItem('profilePic');
    if (savedProfilePic) {
        profilePic.src = savedProfilePic;
    }

    const triggerConfettiBtn = document.getElementById('trigger-confetti');

    if (triggerConfettiBtn) {
        triggerConfettiBtn.addEventListener('click', () => {
            if (typeof confetti === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js';
                script.onload = () => {
                    fireConfetti();
                };
                document.head.appendChild(script);
            } else {
                fireConfetti();
            }
        });
    }

    function fireConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: [
                getComputedStyle(document.documentElement).getPropertyValue('--confetti-1'),
                getComputedStyle(document.documentElement).getPropertyValue('--confetti-2'),
                getComputedStyle(document.documentElement).getPropertyValue('--confetti-3'),
                getComputedStyle(document.documentElement).getPropertyValue('--highlight-color'),
                getComputedStyle(document.documentElement).getPropertyValue('--primary-color')
            ].filter(Boolean)
        });
    }

    document.querySelectorAll('.progress-bar').forEach(bar => {
        const width = bar.style.getPropertyValue('--progress-width');
        bar.style.width = width;
    });

    const todoCheckboxes = document.querySelectorAll('.todo-checkbox');
    const addTodoBtn = document.querySelector('.add-todo-btn');

    const saveTodoState = () => {
        const todoStates = {};
        todoCheckboxes.forEach(checkbox => {
            todoStates[checkbox.id] = checkbox.checked;
        });
        localStorage.setItem('todoStates', JSON.stringify(todoStates));
    };

    const loadTodoState = () => {
        const savedTodoStates = JSON.parse(localStorage.getItem('todoStates'));
        if (savedTodoStates) {
            todoCheckboxes.forEach(checkbox => {
                if (savedTodoStates[checkbox.id] !== undefined) {
                    checkbox.checked = savedTodoStates[checkbox.id];
                    checkbox.dispatchEvent(new Event('change'));
                }
            });
        }
    };

    todoCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            saveTodoState();
        });
    });

    loadTodoState();

    if (addTodoBtn) {
        addTodoBtn.addEventListener('click', () => {
            alert('Adding new tasks is a feature currently under development! Stay tuned!');
        });
    }

    const puzzleBoard = document.getElementById('puzzle-board');
    const resetPuzzleBtn = document.getElementById('reset-puzzle-btn');
    const PUZZLE_SIZE = 3;
    const TOTAL_TILES = PUZZLE_SIZE * PUZZLE_SIZE;
    let tiles = [];
    let emptyTileIndex;
    let isSolved = false;

    function initializePuzzle() {
        if (!puzzleBoard) return;

        puzzleBoard.innerHTML = '';
        puzzleBoard.classList.remove('solved');
        isSolved = false;
        tiles = Array.from({ length: TOTAL_TILES }, (_, i) => i);

        emptyTileIndex = TOTAL_TILES - 1;

        shuffleTiles(tiles);
        renderTiles();
    }

    function shuffleTiles(array) {
        do {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            emptyTileIndex = array.indexOf(TOTAL_TILES - 1);
        } while (!isSolvable(array));
    }

    function isSolvable(arr) {
        let inversions = 0;
        const currentTiles = arr.filter(tile => tile !== TOTAL_TILES - 1);

        for (let i = 0; i < currentTiles.length - 1; i++) {
            for (let j = i + 1; j < currentTiles.length; j++) {
                if (currentTiles[i] > currentTiles[j]) {
                    inversions++;
                }
            }
        }
        return inversions % 2 === 0;
    }

    function renderTiles() {
        puzzleBoard.innerHTML = '';
        puzzleBoard.style.setProperty('--puzzle-bg-size', `${PUZZLE_SIZE * 100}% ${PUZZLE_SIZE * 100}%`);

        tiles.forEach((tileValue, index) => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('puzzle-tile');
            tileElement.dataset.value = tileValue;
            tileElement.dataset.index = index;

            if (tileValue === TOTAL_TILES - 1) {
                tileElement.classList.add('empty');
            } else {
                const originalRow = Math.floor(tileValue / PUZZLE_SIZE);
                const originalCol = tileValue % PUZZLE_SIZE;
                
                const bgPosX = originalCol * (100 / (PUZZLE_SIZE - 1));
                const bgPosY = originalRow * (100 / (PUZZLE_SIZE - 1));

                tileElement.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
            }

            tileElement.addEventListener('click', () => moveTile(index));
            puzzleBoard.appendChild(tileElement);
        });

        const emptyEl = puzzleBoard.querySelector('.puzzle-tile.empty');
        if (emptyEl) {
            emptyEl.textContent = '';
        }
    }

    function moveTile(clickedIndex) {
        if (isSolved) return;

        const emptyRow = Math.floor(emptyTileIndex / PUZZLE_SIZE);
        const emptyCol = emptyTileIndex % PUZZLE_SIZE;
        const clickedRow = Math.floor(clickedIndex / PUZZLE_SIZE);
        const clickedCol = clickedIndex % PUZZLE_SIZE;

        const isAdjacent = (
            (Math.abs(clickedRow - emptyRow) === 1 && clickedCol === emptyCol) ||
            (Math.abs(clickedCol - emptyCol) === 1 && clickedRow === emptyRow)
        );

        if (isAdjacent) {
            [tiles[clickedIndex], tiles[emptyTileIndex]] = [tiles[emptyTileIndex], tiles[clickedIndex]];

            emptyTileIndex = clickedIndex;

            renderTiles();

            if (checkWin()) {
                handleWin();
            }
        }
    }

    function checkWin() {
        for (let i = 0; i < TOTAL_TILES; i++) {
            if (tiles[i] !== i) {
                return false;
            }
        }
        return true;
    }

    function handleWin() {
        isSolved = true;
        puzzleBoard.classList.add('solved');
        const lastTile = puzzleBoard.querySelector('.puzzle-tile.empty');
        if (lastTile) {
            lastTile.classList.remove('empty');
            const originalRow = Math.floor((TOTAL_TILES - 1) / PUZZLE_SIZE);
            const originalCol = (TOTAL_TILES - 1) % PUZZLE_SIZE;
            const bgPosX = originalCol * (100 / (PUZZLE_SIZE - 1));
            const bgPosY = originalRow * (100 / (PUZZLE_SIZE - 1));
            lastTile.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
        }
        fireConfetti();
        alert('Puzzle Solved! Great job!');
    }

    if (resetPuzzleBtn) {
        resetPuzzleBtn.addEventListener('click', initializePuzzle);
    }

    if (puzzleBoard) {
        initializePuzzle();
    }
});
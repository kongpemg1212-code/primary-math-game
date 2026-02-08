// JavaScript Logic for Math Game

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const questionEl = document.getElementById("question");
    const answerInput = document.getElementById("answer-input");
    const submitBtn = document.getElementById("submit-btn");
    const feedbackEl = document.getElementById("feedback");
    const scoreDisplay = document.getElementById("score-display");
    const levelDisplay = document.getElementById("level-display");
    const difficultySelect = document.getElementById("difficulty");
    const resetBtn = document.getElementById("reset-btn");
    
    // Mode Switcher Elements
    const modeArithmeticBtn = document.getElementById("mode-arithmetic");
    const modeLogicBtn = document.getElementById("mode-logic");

    // Generators
    const logicGenerator = new window.LogicGenerator();

    // Game State
    let currentScore = 0;
    let currentDifficulty = 1;
    let currentAnswer = 0;
    let currentMode = "arithmetic"; // 'arithmetic' or 'logic'
    let currentExplanation = "";

    // Difficulty Config
    // Arithmetic:
    // Level 1: 1-10 (+/-), no carry/borrow
    // Level 2: 1-20 (+/-), with carry/borrow
    // Level 3: 1-100 (+/-)
    // Level 4: 1-9 (Multiplication)

    function setMode(mode) {
        currentMode = mode;
        currentScore = 0;
        scoreDisplay.textContent = `得分: 0`;
        
        // UI Updates
        if (mode === "arithmetic") {
            modeArithmeticBtn.classList.add("active");
            modeLogicBtn.classList.remove("active");
        } else {
            modeArithmeticBtn.classList.remove("active");
            modeLogicBtn.classList.add("active");
        }
        
        generateQuestion(currentDifficulty);
    }

    function generateQuestion(level) {
        answerInput.value = "";
        answerInput.focus();
        feedbackEl.textContent = "";
        feedbackEl.className = "feedback";

        if (currentMode === "arithmetic") {
            generateArithmeticQuestion(level);
        } else {
            generateLogicQuestion(level);
        }
    }

    function generateArithmeticQuestion(level) {
        let num1, num2, operator;
        let valid = false;

        while (!valid) {
            switch (parseInt(level)) {
                case 1:
                    num1 = Math.floor(Math.random() * 10) + 1;
                    num2 = Math.floor(Math.random() * 10) + 1;
                    operator = Math.random() > 0.5 ? "+" : "-";
                    break;
                case 2:
                    num1 = Math.floor(Math.random() * 20) + 1;
                    num2 = Math.floor(Math.random() * 20) + 1;
                    operator = Math.random() > 0.5 ? "+" : "-";
                    break;
                case 3:
                    num1 = Math.floor(Math.random() * 100) + 1;
                    num2 = Math.floor(Math.random() * 100) + 1;
                    operator = Math.random() > 0.5 ? "+" : "-";
                    break;
                case 4:
                    num1 = Math.floor(Math.random() * 9) + 1;
                    num2 = Math.floor(Math.random() * 9) + 1;
                    operator = "×";
                    break;
                default:
                    num1 = 1;
                    num2 = 1;
                    operator = "+";
            }

            // Calculate Answer
            if (operator === "+") {
                currentAnswer = num1 + num2;
                valid = true;
            } else if (operator === "-") {
                currentAnswer = num1 - num2;
                // Ensure non-negative result for primary school
                if (currentAnswer >= 0) {
                    valid = true;
                }
            } else if (operator === "×") {
                currentAnswer = num1 * num2;
                valid = true;
            }
        }

        // Render Standard Layout
        questionEl.innerHTML = `
            <span class="operand">${num1}</span>
            <span class="operator">${operator}</span>
            <span class="operand">${num2}</span>
            <span class="equals">=</span>
            <span class="result-placeholder">?</span>
        `;
        currentExplanation = ""; // No explanation for simple arithmetic yet
    }

    function generateLogicQuestion(level) {
        const result = logicGenerator.generate(level);
        questionEl.innerHTML = result.html;
        currentAnswer = result.answer;
        currentExplanation = result.explanation;
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value);

        if (isNaN(userAnswer)) {
            feedbackEl.textContent = "请输入数字！";
            feedbackEl.className = "feedback error";
            return;
        }

        if (userAnswer === currentAnswer) {
            // Correct
            currentScore++;
            feedbackEl.textContent = "✅ 正确！太棒了！";
            feedbackEl.className = "feedback success";
            scoreDisplay.textContent = `得分: ${currentScore}`;
            
            // Auto-next after short delay
            setTimeout(() => {
                generateQuestion(currentDifficulty);
            }, 1500);
        } else {
            // Wrong
            let msg = `❌ 错误！正确答案是 ${currentAnswer}`;
            if (currentExplanation) {
                msg += `<br><span style="font-size: 1rem; color: #666;">💡 ${currentExplanation}</span>`;
            }
            feedbackEl.innerHTML = msg;
            feedbackEl.className = "feedback error";
            
            // For logic puzzles, maybe give them more time to read explanation
            setTimeout(() => {
                generateQuestion(currentDifficulty);
            }, 4000);
        }
    }

    // Event Listeners
    submitBtn.addEventListener("click", checkAnswer);

    answerInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            checkAnswer();
        }
    });

    difficultySelect.addEventListener("change", (e) => {
        currentDifficulty = parseInt(e.target.value);
        currentScore = 0;
        scoreDisplay.textContent = `得分: ${currentScore}`;
        levelDisplay.textContent = `难度: Level ${currentDifficulty}`;
        generateQuestion(currentDifficulty);
    });

    resetBtn.addEventListener("click", () => {
        currentScore = 0;
        scoreDisplay.textContent = `得分: 0`;
        generateQuestion(currentDifficulty);
    });

    // Mode Switchers
    if (modeArithmeticBtn && modeLogicBtn) {
        modeArithmeticBtn.addEventListener("click", () => setMode("arithmetic"));
        modeLogicBtn.addEventListener("click", () => setMode("logic"));
    }

    // Initial Start
    setMode("arithmetic");
});

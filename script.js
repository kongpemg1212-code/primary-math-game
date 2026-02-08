// JavaScript Logic for Math Game

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const questionEl = document.getElementById("question");
    const num1El = document.getElementById("num1");
    const num2El = document.getElementById("num2");
    const operatorEl = document.getElementById("operator");
    const resultPlaceholder = document.querySelector(".result-placeholder");
    const answerInput = document.getElementById("answer-input");
    const submitBtn = document.getElementById("submit-btn");
    const feedbackEl = document.getElementById("feedback");
    const scoreDisplay = document.getElementById("score-display");
    const levelDisplay = document.getElementById("level-display");
    const difficultySelect = document.getElementById("difficulty");
    const resetBtn = document.getElementById("reset-btn");

    // Game State
    let currentScore = 0;
    let currentDifficulty = 1;
    let currentAnswer = 0;
    let isGameOver = false;

    // Difficulty Config
    // Level 1: 1-10 (+/-), no carry/borrow
    // Level 2: 1-20 (+/-), with carry/borrow
    // Level 3: 1-100 (+/-)
    // Level 4: 1-9 (Multiplication)

    function generateQuestion(level) {
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

        // Update UI
        num1El.textContent = num1;
        num2El.textContent = num2;
        operatorEl.textContent = operator;
        answerInput.value = "";
        answerInput.focus();
        feedbackEl.textContent = "";
        feedbackEl.className = "feedback";
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
            }, 1000);
        } else {
            // Wrong
            feedbackEl.textContent = `❌ 错误！正确答案是 ${currentAnswer}`;
            feedbackEl.className = "feedback error";
            // Allow retry or show next? Let's show next after delay.
            setTimeout(() => {
                generateQuestion(currentDifficulty);
            }, 2000);
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

    // Initial Start
    generateQuestion(currentDifficulty);
});
// Logic Puzzle Generator
// Generates visual logic puzzles (e.g. substitution problems)

class LogicGenerator {
    constructor() {
        this.emojis = ["🍎", "🍌", "🍇", "🍊", "🍓", "🐻", "🐰", "🐱", "🐶", "🦁", "🐮", "🐷", "🐸"];
        this.currentAnswer = 0;
        this.explanation = "";
    }

    getRandomEmojis(count) {
        const shuffled = [...this.emojis].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    generate(level) {
        // Level 1: Simple Count (🍎 + 🍎 = ?)
        // Level 2: Direct Substitution (1 A = k B, m A = ?)
        // Level 3: Transitive Substitution (1 A = k B, 1 B = m C, 1 A = ?)
        // Level 4: Complex (2 A = 4 B, etc.)

        switch (parseInt(level)) {
            case 1:
                return this.generateLevel1();
            case 2:
                return this.generateLevel2();
            case 3:
                return this.generateLevel3();
            case 4:
                return this.generateLevel3(); // Reuse level 3 for now, or add more complex later
            default:
                return this.generateLevel1();
        }
    }

    // Level 1: Simple Counting & Addition
    // 🍎 🍎 + 🍎 = ?
    generateLevel1() {
        const [emoji] = this.getRandomEmojis(1);
        const count1 = Math.floor(Math.random() * 5) + 1;
        const count2 = Math.floor(Math.random() * 5) + 1;
        const total = count1 + count2;

        const part1 = Array(count1).fill(emoji).join(" ");
        const part2 = Array(count2).fill(emoji).join(" ");
        
        const html = `
            <div class="logic-row">
                <span>${part1}</span>
                <span class="operator">+</span>
                <span>${part2}</span>
                <span class="operator">=</span>
                <span class="result-placeholder">?</span>
            </div>
        `;

        return {
            html: html,
            answer: total,
            explanation: `${count1}个${emoji} 加上 ${count2}个${emoji}，一共有 ${total}个${emoji}。`
        };
    }

    // Level 2: Direct Substitution
    // 1 🐻 = 2 🐰
    // 3 🐻 = ? 🐰
    generateLevel2() {
        const [a, b] = this.getRandomEmojis(2);
        const ratio = Math.floor(Math.random() * 3) + 2; // 2 or 3 or 4
        const askCount = Math.floor(Math.random() * 3) + 2; // 2 to 4
        const answer = askCount * ratio;

        const html = `
            <div class="logic-row">
                <span>1 ${a}</span>
                <span class="operator">=</span>
                <span>${ratio} ${b}</span>
            </div>
            <div class="logic-row">
                <span>${askCount} ${a}</span>
                <span class="operator">=</span>
                <span class="result-placeholder">?</span>
                <span>${b}</span>
            </div>
        `;

        return {
            html: html,
            answer: answer,
            explanation: `
                1个${a} 等于 ${ratio}个${b}。<br>
                ${askCount}个${a} 就是 ${askCount} × ${ratio} = ${answer}个${b}。
            `
        };
    }

    // Level 3: Transitive Substitution (Chain)
    // 1 🐻 = 2 🐰
    // 1 🐰 = 3 🥕
    // 1 🐻 = ? 🥕
    generateLevel3() {
        const [a, b, c] = this.getRandomEmojis(3);
        const ratio1 = Math.floor(Math.random() * 2) + 2; // 2 to 3
        const ratio2 = Math.floor(Math.random() * 3) + 2; // 2 to 4
        const answer = ratio1 * ratio2;

        const html = `
            <div class="logic-row">
                <span>1 ${a}</span>
                <span class="operator">=</span>
                <span>${ratio1} ${b}</span>
            </div>
            <div class="logic-row">
                <span>1 ${b}</span>
                <span class="operator">=</span>
                <span>${ratio2} ${c}</span>
            </div>
            <div class="logic-row">
                <span>1 ${a}</span>
                <span class="operator">=</span>
                <span class="result-placeholder">?</span>
                <span>${c}</span>
            </div>
        `;

        return {
            html: html,
            answer: answer,
            explanation: `
                第一步：1个${a} 可以换成 ${ratio1}个${b}。<br>
                第二步：每个${b} 可以换成 ${ratio2}个${c}。<br>
                所以：${ratio1}个${b} 就是 ${ratio1} × ${ratio2} = ${answer}个${c}。
            `
        };
    }
}

window.LogicGenerator = LogicGenerator;

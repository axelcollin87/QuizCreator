const questionsContainer = document.getElementById("questions-container");
const addQuestion = document.getElementById("add-question");

let qNumber = 1;

addQuestion.addEventListener("click", () => {
    const html = `
        <div class="content-container" id="content-container-${qNumber}">
            <label for="quiz-question-${qNumber}">Type your question here:</label>
            <br />
            <input type="text" name="quiz-question-${qNumber}" />
            <br />
            <label>Select question type:</label>
            <br />
            <input value="text" name="${qNumber}" type="radio" />
            <label for="text">Text question</label>
            <br />
            <input value="radio" name="${qNumber}" type="radio" />
            <label for="radio">Radio question</label>
            <br />
            <input value="check" name="${qNumber}" type="radio" />
            <label for="check">Checkbox question</label>
            <br />
        </div>
        `;
    qNumber += 1;
    questionsContainer.innerHTML += html;
});

questionsContainer.addEventListener("click", (event) => {
    if (event.target.type === "radio") {
        const targetQuestion = document.getElementById(
            `content-container-${event.target.name}`
        );
        switch (event.target.value) {
            case "text":
                targetQuestion.innerHTML += `
                <label>Answer:</label>
                <br />
                <input type="text" />`;
                break;
            case "radio":
                targetQuestion.innerHTML += `
                <label>Alternative 1:</label>
                <br />
                <input type="text" />
                <br />
                <label>Alternative 2:</label>
                <br />
                <input type="text" />
                <br />
                <button>Add alternative</button>`;
                break;
            case "check":
                targetQuestion.innerHTML += `
                <label>Alternative 1:</label>
                <br />
                <input type="text" />
                <br />
                <label>Alternative 2:</label>
                <br />
                <input type="text" />
                <br />
                <button>Add alternative</button>`;
                break;
        }
    }
});

function calculateHealth() {

    let score = 100;

    const plannedCompletion =
        Number(document.getElementById("plannedCompletion").value);

    const actualCompletion =
        Number(document.getElementById("actualCompletion").value);

    const plannedBudget =
        Number(document.getElementById("plannedBudget").value);

    const actualSpend =
        Number(document.getElementById("actualSpend").value);

    const highRisks =
        Number(document.getElementById("highRisks").value);

    const stakeholderScore =
        Number(document.getElementById("stakeholderScore").value);

    const resourceUtilization =
        Number(document.getElementById("resourceUtilization").value);

    const rootCauses = [];
    const recommendations = [];

    // Schedule

    const scheduleDelay =
        plannedCompletion - actualCompletion;

    if(scheduleDelay > 20){
        score -= 25;

        rootCauses.push("Major schedule slippage");

        recommendations.push(
            "Conduct schedule recovery workshop"
        );

        recommendations.push(
            "Review critical path activities"
        );

        recommendations.push(
            "Fast-track non-dependent tasks"
        );
    }
    else if(scheduleDelay >= 10){
        score -= 15;

        rootCauses.push("Moderate schedule delay");

        recommendations.push(
            "Review milestone plan"
        );
    }
    else if(scheduleDelay > 0){
        score -= 5;
    }

    // Budget

    const budgetVariance =
        ((actualSpend - plannedBudget)
        / plannedBudget) * 100;

    if(budgetVariance > 15){

        score -= 20;

        rootCauses.push("Significant cost overrun");

        recommendations.push(
            "Review cost drivers"
        );

        recommendations.push(
            "Freeze non-essential spending"
        );

        recommendations.push(
            "Renegotiate vendor contracts"
        );
    }
    else if(budgetVariance >= 5){

        score -= 10;

        rootCauses.push("Budget pressure");

        recommendations.push(
            "Increase cost monitoring"
        );
    }

    // Risks

    if(highRisks > 5){

        score -= 20;

        rootCauses.push(
            "High risk exposure"
        );

        recommendations.push(
            "Escalate critical risks"
        );

        recommendations.push(
            "Implement mitigation plans"
        );
    }
    else if(highRisks >= 3){

        score -= 10;

        rootCauses.push(
            "Moderate risk exposure"
        );
    }

    // Stakeholders

    if(stakeholderScore <= 2){

        score -= 15;

        rootCauses.push(
            "Stakeholder dissatisfaction"
        );

        recommendations.push(
            "Conduct stakeholder interviews"
        );

        recommendations.push(
            "Establish weekly communication cadence"
        );
    }
    else if(stakeholderScore === 3){

        score -= 5;
    }

    // Resources

    if(resourceUtilization > 100){

        score -= 10;

        rootCauses.push(
            "Resource overallocation"
        );

        recommendations.push(
            "Review workload distribution"
        );

        recommendations.push(
            "Add temporary resources"
        );
    }

    if(score < 0){
        score = 0;
    }

    let status = "";
    let statusClass = "";

    if(score >= 80){
        status = "🟢 GREEN";
        statusClass = "green";
    }
    else if(score >= 60){
        status = "🟠 AMBER";
        statusClass = "amber";
    }
    else{
        status = "🔴 RED";
        statusClass = "red";
    }

    document.getElementById("healthScore").innerText = score;

    const statusElement =
        document.getElementById("statusBadge");

    statusElement.innerText = status;
    statusElement.className = statusClass;

    const rootCauseList =
        document.getElementById("rootCauses");

    rootCauseList.innerHTML = "";

    rootCauses.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        rootCauseList.appendChild(li);
    });

    const recommendationList =
        document.getElementById("recommendations");

    recommendationList.innerHTML = "";

    recommendations.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        recommendationList.appendChild(li);
    });

    document.getElementById("results")
        .classList.remove("hidden");
}

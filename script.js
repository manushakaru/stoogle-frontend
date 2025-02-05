const topics = [
    {
        id: "Topic A",
        total: 14, // Total articles for this topic
        text: "Lorem ipsum odor amet, consectetuer adipiscing elit. Nam duis nulla aliquam commodo ligula potenti porta. Placerat aliquet habitant donec, at dis maximus taciti cras. Lacinia consequat convallis parturient habitant efficitur tempus vivamus morbi malesuada. Euismod pretium augue nostra ornare lacus nisi dis elementum. Tempus maecenas quam habitasse lobortis et vel. Lacinia nullam sagittis purus nostra quis maximus consectetur varius. Class class vestibulum fusce; metus mauris volutpat. Auctor placerat consequat ut malesuada purus.",
        articlesByYear: {
            2021: [
                { link: "https://example.com/a1" },
                { link: "https://example.com/a2" },
                { link: "https://example.com/a3" },
                { link: "https://example.com/a4" },
                { link: "https://example.com/a5" },
                { link: "https://example.com/a6" },
                { link: "https://example.com/a7" },
                { link: "https://example.com/a8" },
                { link: "https://example.com/a9" },
                { link: "https://example.com/a10" }
            ],
            2022: [
                { link: "https://example.com/a11" },
                { link: "https://example.com/a12" }
            ],
            2023: [
                { link: "https://example.com/a13" },
                { link: "https://example.com/a14" }
            ]
        }
    },
    {
        id: "Topic B",
        total: 5, // Total articles for this topic
        text: "Class porta vehicula adipiscing varius ultricies. Blandit arcu phasellus potenti dapibus arcu. Condimentum orci posuere urna ex consequat justo amet aliquam praesent. Tortor nulla odio suspendisse, elit vel tincidunt. Luctus euismod tempus justo; curabitur id suscipit. Curae turpis praesent enim potenti imperdiet sagittis. Sem aliquet hac amet suspendisse sit parturient inceptos. Nullam parturient mauris eget; aptent tempus facilisi.",
        articlesByYear: {
            2021: [
                { link: "https://example.com/b1" },
                { link: "https://example.com/c2" },
                { link: "https://example.com/b3" }
            ],
            2022: [
                { link: "https://example.com/b4" },
                { link: "https://example.com/b5" }
            ]
        }
    },
    {
        id: "Topic C",
        total: 3, // Total articles for this topic
        text: "Placerat taciti parturient finibus egestas porta ullamcorper ipsum nisi. Imperdiet morbi imperdiet eleifend quis, volutpat dapibus duis viverra. Fermentum mauris fermentum finibus arcu sapien sollicitudin nulla euismod inceptos. Montes nisi et sit id aliquam neque tristique pretium. Nullam congue nec nunc pellentesque ipsum orci. Habitant mi in torquent aenean dolor aenean, posuere at. Velit lectus curae arcu vivamus gravida? Aliquet lorem per posuere nisi molestie; nascetur commodo.",
        articlesByYear: {
            2021: [
                { link: "https://example.com/b1" },
                { link: "https://example.com/c2" },
                { link: "https://example.com/c3" }
            ]
        }
    },
    {
        id: "Topic D",
        total: 9, // Total articles for this topic
        text: "Nullam quam consequat et maecenas viverra placerat? Fermentum sagittis vehicula porttitor natoque nibh purus, aliquet neque. Luctus donec in quis consequat duis per ridiculus. Ligula ullamcorper sed iaculis natoque velit vitae erat potenti massa. Lobortis aenean pharetra sed cubilia suscipit congue habitant. Ullamcorper imperdiet class auctor tincidunt enim. Augue eros dictum conubia sed neque.",
        articlesByYear: {
            2021: [
                { link: "https://example.com/a1" },
                { link: "https://example.com/c2" },
                { link: "https://example.com/d3" },
                { link: "https://example.com/d4" },
                { link: "https://example.com/d5" },
                { link: "https://example.com/d6" },
                { link: "https://example.com/d7" },
                { link: "https://example.com/d8" }
            ],
            2022: [
                { link: "https://example.com/d9" }
            ]
        }
    }
];


const margin = 0;
const width = 600;
const height = 600;

const yearColorScale = d3.scaleOrdinal()
    .domain([2021, 2022, 2023])
    .range(d3.schemeCategory10);

const topicColorScale = d3.scaleLinear()
    .domain([0, d3.max(topics, d => d.total)])
    .range(["#ffcccc", "#990000"]);

const svg = d3.select("#graph-container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

const numTopics = topics.length;
const angleStep = (2 * Math.PI) / numTopics;
const circles = {};

const topicGroup = svg.selectAll(".circle-layer")
    .data(topics)
    .enter().append("g")
    .attr("class", "circle-layer")
    .attr("transform", (d, i) => {
        const angle = i * angleStep;
        const x = Math.cos(angle) * (width / 3);
        const y = Math.sin(angle) * (height / 3);
        circles[d.id] = {"x" : x, "y" : y};
        return `translate(${x}, ${y})`;
    });

const dotPositions = {};





topicGroup.each(function(d) {
    const group = d3.select(this);
    const topicColor = topicColorScale(d.total);
    const totalArticles = d.total;
    const radius = width/20 + totalArticles * width/200;
    circles[d.id]["radius"] = radius;

    const years = Object.keys(d.articlesByYear);
    const anglePerArticle = Math.PI / totalArticles;

    const arc = d3.arc()
        .innerRadius(radius + width/120)
        .outerRadius(radius + width/30)
        .startAngle(Math.PI / 2)
        .endAngle(3 * Math.PI / 2);

    const percentageArc = d3.arc()
        .innerRadius(radius)
        .outerRadius(radius + width/120)
        .startAngle(Math.PI / 2)
        .endAngle(3 * Math.PI / 2);

    let cumulativeAngle = Math.PI / 2;

    years.forEach((year) => {
        const articles = d.articlesByYear[year];
        const numArticles = articles.length;
        const percentage = (numArticles / totalArticles) * 100;
        const yearColor = yearColorScale(year);

        group.append("path")
            .attr("class", "percentage-ring")
            .attr("d", percentageArc.startAngle(cumulativeAngle).endAngle(cumulativeAngle + (anglePerArticle * numArticles))())
            .attr("fill", yearColor)
            .attr("stroke", "gray")  
            .attr("stroke-width", 1);   

   
        articles.forEach((article) => {
            let angleStart = cumulativeAngle;
            let angleEnd = cumulativeAngle + anglePerArticle;
            group.append("path")
                .attr("class", "ring-segment")
                .attr("d", arc.startAngle(angleStart).endAngle(angleEnd)())
                .attr("fill", yearColor)
                .attr("stroke", "gray")  
                .attr("stroke-width", 1)
                .on("click", () => window.location.href = article.link)
                .on("mouseover", function() {
                    d3.select(this).transition()
                        .duration(200)
                        .attr("transform", "scale(1.1)")
                        .attr("stroke", "black")
                        .attr("stroke-width", 2);
                })
                .on("mouseout", function() {
                    d3.select(this).transition()
                        .duration(200)
                        .attr("transform", "scale(1)")
                        .attr("stroke", "none");
                });

            const midpointAngle = (angleStart + angleEnd - Math.PI) / 2;
            const dotX = Math.cos(midpointAngle) * (radius + 10);  
            const dotY = Math.sin(midpointAngle) * (radius + 10);

            if (!dotPositions[article.link]) {
                dotPositions[article.link] = [];
            }
            dotPositions[article.link].push({ topic: d.id, angle: midpointAngle });
            
            cumulativeAngle += anglePerArticle;
        });
    });

    group.append("circle")
        .attr("class", "circle")
        .attr("r", radius)
        .attr("fill", topicColor)
        .attr("id", d.id)
        .on("click", function(event) {
            const framex = width / 2;
            const framey = height / 2;
            const translateX = -circles[this.id].x;
            const translateY = -circles[this.id].y;
            const scaleFactor = 2;
            svg.transition().duration(750)
                .attr("transform", `translate(${translateX *scaleFactor + framex}, ${ translateY * scaleFactor + framey}) scale(${scaleFactor})`)
        });

    group.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .style("font-size", "20px")
        .style("fill", "#fff")
        .text(d.id);
});

//console.log(circles);
//console.log(dotPositions);

function getCircleEdgePoint(circle, angle) {
    return {
      x: circle.x + (circle.radius+10) * Math.cos(angle),
      y: circle.y + (circle.radius+10) * Math.sin(angle)
    };
}

Object.keys(dotPositions).forEach((link) => {
    const positions = dotPositions[link];
    if (positions.length > 1) {
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const circle1 = circles[positions[i].topic];
                const circle2 = circles[positions[j].topic];

                const point1 = getCircleEdgePoint(circle1, positions[i].angle);
                const point2 = getCircleEdgePoint(circle2, positions[j].angle);

                svg.append("path")
                    .attr("class", "curve")
                    .attr("d", d3.line().curve(d3.curveBasis)([
                        [point1.x, point1.y],
                        [(point1.x + point2.x) / 2, (point1.y + point2.y) / 2 - 50],
                        [point2.x, point2.y]
                    ]))
                    .attr("stroke", "#000")
                    .attr("stroke-width", 1)
                    .attr("fill", "none");

                svg.append("circle")
                    .attr("cx", point1.x)
                    .attr("cy", point1.y)
                    .attr("r", 3)
                    .attr("fill", "#000");

                svg.append("circle")
                    .attr("cx", point2.x)
                    .attr("cy", point2.y)
                    .attr("r", 3)
                    .attr("fill", "#000");
            }
        }
    }
});

d3.select("body").on("click", function(event) {
    if (!event.target.closest('.circle-layer')) {
        svg.transition().duration(750)
            .attr("transform", `translate(${width / 2}, ${height / 2}) scale(1)`);
    }
});

function displaySteps() {
    const stepsContainer = document.getElementById("steps-container"); 
 
    topics.forEach((topic, index) => {
        const stepDiv = document.createElement("div");
        stepDiv.classList.add("step");
        stepDiv.setAttribute("data-step", topic.id);   

        
        const paragraph = document.createElement("p");
        paragraph.innerText = topic.id+ ": " + topic.text;   

       
        stepDiv.appendChild(paragraph);

     
        stepsContainer.appendChild(stepDiv);  
    });
    
    //暂留
    const stepDiv = document.createElement("div");
    stepDiv.classList.add("step");
    stepDiv.setAttribute("data-step", "end");  

    
    const paragraph = document.createElement("p");
    paragraph.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    stepDiv.appendChild(paragraph);

    
    stepsContainer.appendChild(stepDiv);  
}

displaySteps()

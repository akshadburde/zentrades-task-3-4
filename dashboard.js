function fetchData() {
    
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                totalRevenue: 406411.29,
                totalJobsAverage: 650,
                ticketsCreated: 655,
                ticketsScheduled: 735,
                outstandingAmount: 110448.8,
                membershipsSold: 105,
                jobsCompleted: 436,
                totalCanceled: 65
            });
        }, 1000);
    });
}

// Update metric values on the dashboard
async function updateMetrics() {
    const data = await fetchData();

    document.getElementById('totalRevenue').textContent = `$${data.totalRevenue}`;
    document.getElementById('totalJobsAverage').textContent = data.totalJobsAverage;
    document.getElementById('ticketsCreated').textContent = data.ticketsCreated;
    document.getElementById('ticketsScheduled').textContent = data.ticketsScheduled;
    document.getElementById('outstandingAmount').textContent = `$${data.outstandingAmount}`;
    document.getElementById('membershipsSold').textContent = data.membershipsSold;
    document.getElementById('jobsCompleted').textContent = data.jobsCompleted;
    document.getElementById('totalCanceled').textContent = data.totalCanceled;
}

updateMetrics();


// Function to create and render bar charts
function renderBarCharts() {
    
    // Example data
    const revenueByLocationData = [
        { Location: 'Everett', Revenue: 50000 },
        { Location: 'Seattle', Revenue: 70000 },
        { Location: 'Lynnwood', Revenue: 30000 },
        { Location: 'Bothell', Revenue: 10000 }
    ];

    const revenueByJobTypeData = [
        { JobType: 'Service Plumbing', Revenue: 40000 },
        { JobType: 'Bid Work HVAC', Revenue: 60000 },
        { JobType: 'Service HVac', Revenue: 80000 },
        { JobType: 'Maintenance', Revenue: 100000 }
    ];

    // Function to create a horizontal bar chart with rotated x-axis labels
    function createHorizontalBarChart(containerId, data, xLabel, yLabel) {
        const margin = { top: 30, right: 60, bottom: 60, left: 150 }; 
        const width = 600 - margin.left - margin.right;
        const height = 200 - margin.top - margin.bottom;

        const svg = d3.select(`#${containerId}`)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const y = d3.scaleBand()
            .range([height, 0])
            .domain(data.map(d => d[yLabel]))
            .padding(0.1);

        // Adjust the domain of x to control the spacing
        const x = d3.scaleLinear()
            .range([0, width])
            .domain([0, d3.max(data, d => d[xLabel]) + 20000]); 

        svg.append('g')
            .call(d3.axisLeft(y));

        // Rotated x-axis labels
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('y', d => y(d[yLabel]))
            .attr('height', y.bandwidth())
            .attr('width', d => x(d[xLabel]))
            .attr('fill', '#1f78b4');

        // Labels
        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height + margin.top + 10)
            .style('text-anchor', 'middle')
            .text(xLabel);

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -height / 2)
            .attr('y', -margin.left)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text(yLabel);
    }

    // Create horizontal bar charts
    createHorizontalBarChart('revenueByLocationChart', revenueByLocationData, 'Revenue', 'Location');
    createHorizontalBarChart('revenueByJobTypeChart', revenueByJobTypeData, 'Revenue', 'JobType');
}

// Call the function to render bar charts
renderBarCharts();


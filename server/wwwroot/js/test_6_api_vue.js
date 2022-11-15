$(document).ready(function () {

    function getTime(dateString) {
        return new Date(dateString).getTime();
    }
    Vue.component('linegraph', {
        props: ['data','max','min'],
        computed: {
            d() {
                const data = this.data;
                if (data && data.length > 10) {
                    const y = d3.scaleLinear()
                        .domain([this.max, this.min])
                        .range([295, 0]);
                    const x = d3.scaleLinear()
                        .domain([getTime(data[0].timestamp), getTime(data[data.length - 1].timestamp)])
                        .range([0, 1500]);
                    console.log(y.domain(), x.domain());
                    const lineGenerator = d3.line()
                        .x(d => x(getTime(d.timestamp)))
                        .y(d => 300 - y(d.value));
                    return lineGenerator(data);
                }
                return "";
            }
        },

        template: `
        <svg width="1501" height="400" style="margin: 25px 0px;">
            <defs>
                <pattern id="smallGrid" width="9" height="9" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5"/>
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect width="100" height="100" fill="url(#smallGrid)"/>
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"/>
                </pattern>
          </defs>
          <rect width="100%" height="302" transform="translate(0,57)" fill="url(#grid)" />
            <path :d="d" transform="translate(0,55)" stroke="#39AB87" stroke-width="5" fill="none"/>
            <text x="0" y="25" font-family="sans-serif" font-size="25px" style: fill="#dcdde1">max: {{ max.toFixed(0) }}</text>
            <text x="0" y="400" font-family="sans-serif" font-size="25px" fill="#dcdde1">min: 0</text>
        </svg >`,
    })

    var app = new Vue({
        el: '#app',
        data: {  
            rpm: { data: [], max: 9500, min: 0 },
            speed: { data: [], max: 440, min: 0 },
        },
        template:`
        <span>
            <h1 style="text-align: center; margin-top: 75px;">RPM - Chart</h1>
            <linegraph :data="rpm.data" :max="rpm.max" :min="rpm.min" ></linegraph>
            <h1 style="text-align: center;">Speed - Chart</h1>
            <linegraph :data="speed.data" :max="speed.max" :min="speed.min"></linegraph>
        </span>
        `,
        created: function() {

            fetch('/api/analyze').then(res => res.json()).then(data => {
                this.rpm.data = data.map(d => ({ timestamp: d.timestamp, value: d.rpm }));
                this.rpm.max = d3.max(data, d => d.maxrpm);

                this.speed.data = data.map(d => ({ timestamp: d.timestamp, value: d.speed }));
                this.speed.max = d3.max(data, d=> d.speed);
            });
        },
    });
});
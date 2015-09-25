var myGrades = [{
    term: '1A',
    termAvg: 73.80,
    cumlativeAvg: 73.80,
    courses: [{
        course: 'BUS 111W',
        description: 'Introduciton to Business Organizationn (WLU)',
        grade: 72
    }, {
        course: 'CS 135',
        description: 'Designing Functional Programs',
        grade: 73
    }, {
        course: 'Econ 101',
        description: 'Introductions to Microeconomics',
        grade: 84
    }, {
        course: 'Math 135',
        description: 'Algebra for Honors Mathematics',
        grade: 70
    }, {
        course: 'Math 137',
        description: 'Calculus 1 for Honors Mathematics',
        grade: 70
    }]
}, {
    term: '1B',
    termAvg: 73.80,
    cumlativeAvg: 73.80,
    courses: [{
        course: 'CS 136',
        description: 'Elementary Algorithm Design and Data Abstraction',
        grade: 74
    }, {
        course: 'ECON 102',
        description: 'Introduction to Macroeconomics',
        grade: 77
    }, {
        course: 'ENGL 119',
        description: 'Communications in Mathematics & Computer Science',
        grade: 84
    }, {
        course: 'Math 136',
        description: 'Linear Algebra 1 for Honors Mathematics',
        grade: 59
    }, {
        course: 'Math 138',
        description: 'Calculus 2 for Honors Mathematics',
        grade: 75
    }]
}, {
    term: '2A',
    termAvg: 80.40,
    cumlativeAvg: 76.00,
    courses: [{
        course: 'CS 245',
        description: 'Logic and Computation',
        grade: 73
    }, {
        course: 'CS 246',
        description: 'Object-Oriented Software Development',
        grade: 86
    }, {
        course: 'MATH 239',
        description: 'Introduction to Combinatorics',
        grade: 83
    }, {
        course: 'MSCI 211',
        description: 'Organizational Behaviour',
        grade: 78
    }, {
        course: 'STAT 230',
        description: 'Probability',
        grade: 82
    }]
}, {
    term: '2B',
    termAvg: 84.40,
    cumlativeAvg: 78.10,
    courses: [{
        course: 'CO 250',
        description: 'Introduction to Optimization',
        grade: 82
    }, {
        course: 'CS 240',
        description: 'Data Structures and Data Management',
        grade: 92
    }, {
        course: 'CS 241',
        description: 'Foundations of Sequential Programming',
        grade: 81
    }, {
        course: 'CS 251',
        description: 'Computer Organization and Design',
        grade: 96
    }, {
        course: 'STAT 231',
        description: 'Statistics',
        grade: 71
    }]
}, {
    term: '3A',
    courses: [{
        course: 'CS 341',
        description: 'Algorithms',
    }, {
        course: 'CS 348',
        description: 'Introduction to Data Manamgement',
    }, {
        course: 'CS 350',
        description: 'Operating Systems',
    }, {
        course: 'HRM 200',
        description: 'Basic Human Resources Management',
    }, {
        course: 'ECON 344',
        description: 'Marketing: Principles of Marketing and Consumer Economics',
    }]
}];

var myProjects = [{
    name: 'YoutubeChannels',
    img: 'assets/images/YoutubeChannels.png',
    link: 'http://sj119.github.io/YoutubeChannels/',
    github: 'https://github.com/SJ119/YoutubeChannels'
}, {
    name: 'WeekndHead',
    img: 'assets/images/WeekndHead.png',
    link: 'http://sj119.github.io/WeekndHead/',
    github: 'https://github.com/SJ119/WeekndHead'
}, {
    name: 'Double Flap',
    img: 'assets/images/DoubleFlap.png',
    link: 'https://play.google.com/store/apps/details?id=com.moustacheapps.doubleflap&hl=en',
    github: 'https://github.com/SJ119/DoubleFlap'

}, {
    name: 'Corners',
    img: 'assets/images/Corners.png',
    link: 'https://play.google.com/store/apps/details?id=com.moustacheapps.corners&hl=en',
    github: 'https://github.com/SJ119/Corners'

}, {
    name: 'Minion Mash',
    img: 'assets/images/MinionMash.png',
    link: 'https://play.google.com/store/apps/details?id=com.moustacheapps.leaguegame&hl=en',
    github: 'https://github.com/SJ119/MinionMash'

}, {
    name: 'Space Game',
    img: 'assets/images/SpaceGame.png',
    github: 'https://github.com/SJ119/SpaceGame'
}];

var myContactInfo = [
    {
    	title: 'Mail',
    	href: 'mailto:s29jin@uwaterloo.ca'},
    {
    	title: 'GitHub',
    	href: 'https://github.com/SJ119?tab=contributions&period=monthly'},
    {
    	title: 'LinkedIn',
    	href: 'https://www.linkedin.com/profile/view?id=AAIAABMd-ZkBg31H67XRHDPTxQst-8siKfWZUe0&trk=nav_responsive_tab_profile_pic'},
    {
    	title: 'Resume',
    	href: 'assets/ShenJinResume.pdf'},
];

var courses = d3.select('.content-education .courses').selectAll('.terms').data(myGrades)
    .enter()
    .append('div')
    .attr({
        class: 'col-xs-12 col-sm-6 col-md-4 terms'
    });

courses
    .append('h3')
    .text(function(d) {
        return d.term;
    });

var lists = courses
    .append('ul')
    .selectAll('.courses').data(function(d) {
        return d.courses;
    })
    .enter()
    .append('li');

lists
    .append('b')
    .text(function(d) {
        return d.course + ': ';
    });

lists
    .append('span')
    .text(function(d) {
        return d.description;
    });


var projects = d3.select('.content-projects .projects').selectAll('.project').data(myProjects)
    .enter()
    .append('div')
    .attr({
        class: 'col-xs-6 col-sm-6 col-md-4 project'
    });

projects
    .append('h3')
    .text(function(d) {
        return d.name;
    });

projects
    .append('a')
    .attr({
        href: function(d) {
            return d.link;
        },
        target: '_blank'
    })
    .append('img')
    .attr({
        src: function(d) {
            return d.img;
        }
    });

var contacts = d3.select('.content-contact .contact')
    .append('ul')
    .selectAll('.contacts').data(myContactInfo)
    .enter()
    .append('li')
    .append('a')
    .attr({
    	href: function(d) {
    		return d.href;
    	},
    	target: '_blank'
    })
    .text(function(d){
    	return d.title;
    });

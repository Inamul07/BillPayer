var getpayer = new getPayer;

function getPayer(){

    this.applicants = [];

    this.init = function(){
        this.addApplicants();
        this.getRandomUser();
        this.runAgain();
        this.startAgain();
    }

    this.showList = function(){
        var parent = document.querySelector(".applicant_list_wrapper");
        var template = "";

        for(var i = 0 ; i < this.applicants.length ; i++){
            template += '<span class="name-tag" data-card="'+ i +'">' + this.applicants[i] + '</span>';
        }

        parent.innerHTML = '';
        parent.insertAdjacentHTML("afterbegin",template);
        this.deleteOne();

    }
    
    this.addApplicants = function (){

        var $this = this;

        function generateList(input){

            var value = input.value;

            if($this.checkValid(value.toLowerCase())){
                
                $this.applicants.push(value);
                input.value="";
                $this.showList();

            }
        }

        var addBtn = document.querySelector("#add_applicant");

        addBtn.addEventListener("click",function(){

            var input = document.querySelector(".applicant_value");
            generateList(input)

        })

    }

    this.checkValid = function(value){

        if(this.applicants.indexOf(value) > 0){
            alert("Same Values Not Allowed.")
        }else if(value == ""){
            alert("Empty Values Are Not Allowed.")
        }else{
            return true;
        }
    }

    this.getRandomUser = function(){
        var $this = this;
        var resultsBtn = document.querySelector("#show_results");

        function showPayer(){
            
            var applicantContainer = document.querySelector(".applicant_container");
            var resultsContainer = document.querySelector(".results_container");

            applicantContainer.className += " hidden";
            resultsContainer.className = "results_container";

            $this.showRandomUser();

        }

        resultsBtn.addEventListener("click",function(){

            if($this.applicants.length > 1){
                showPayer();
            }else{
                alert("Please Enter More Values.")
            }

        })

    }

    this.showRandomUser = function(){
        
        var result = document.querySelector(".result");
        var rand = this.applicants[Math.floor(Math.random() * this.applicants.length)];

        result.innerHTML = "";
        result.insertAdjacentHTML("afterbegin" , "<h3>"+ rand +"</h3>");

    }

    this.runAgain = function(){

        var $this = this;
        var runAgainBtn = document.querySelector(".run_again");

        runAgainBtn.addEventListener("click",function(){
            $this.showRandomUser();
        })

    }

    this.startAgain = function(){

        var $this = this;
        var startAgainBtn = document.querySelector(".start_again");

        startAgainBtn.addEventListener("click",function(){
            
            var applicantContainer = document.querySelector(".applicant_container");
            var resultsContainer = document.querySelector(".results_container");
            var applicantWrapper = document.querySelector(".applicant_list_wrapper");

            resultsContainer.className = "results_container hidden";
            applicantContainer.className = "applicant_container";
            applicantWrapper.innerHTML = "";

            $this.applicants = [];

        })

    }

    this.deleteOne = function(){
        var $this = this;
        var item = document.querySelectorAll(".name-tag");

        function removeIt(element){

            var attr = parseInt(element.getAttribute("data-card"));
            $this.applicants.splice(attr,1);
            $this.showList();

        }

        for(var i = 0 ; i < item.length ; i++ ){

            item[i].addEventListener("click",function(){
                removeIt(this);
            })
        
        }

    }

}

getpayer.init();
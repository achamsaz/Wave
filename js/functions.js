$(function() {
	$( "body>[data-role='panel']" ).panel();
	$( "body>[data-role='panel']" ).panel().enhanceWithin();
});

$(document).on("pageshow",function(){
	
	// Remove previous highlight from correct answer
	$(".wave-correct").removeClass("wave-highlight");
	
	// Hide search input by default
	$(".search-form").hide();

	// Change icon from carat-r to minus and back when clicking the Edit List button
	var changed = 0;
	$(".wave-edit").on("tap",function(){
	  if(changed){
		  $(".wave-icon").buttonMarkup({ icon: "carat-r", iconpos: "right", corners: false });
		  $(".wave-edit").html("Edit List");
		  changed = 0;
	  }
	  else{
	  	$(".wave-icon").buttonMarkup({ icon: "minus", iconpos: "right", corners: false });
	  	$(".wave-edit").html("Done");
	  	changed = 1;
	  }
	});
	
	// Toggle icons background white/black 
	$(".wave-invert").on("tap",function(){
	  $(this).toggleClass("ui-alt-icon");
  	});

	// Draw a line around selected image
	$(".wave-wrong").on("tap",function(){
	  $(this).addClass("wave-selected");
	  setTimeout(function (){
			$(".wave-wrong").removeClass("wave-selected");
		}, 100);
	});
});

// Play instructions
$(document).on("pagecreate", "#start-p1-t1", function(){
	 $("#wave-audio").get(0).src = "voice/play-quiet.mp3";
	 $("#wave-audio").get(0).play();
});
$(document).on("pagecreate", "#start-p1-t2", function(){
	 $("#wave-audio").get(0).src = "voice/come.mp3";
	 $("#wave-audio").get(0).play();
});
$(document).on("pagecreate", "#start-p1-t3", function(){
	 $("#wave-audio").get(0).src = "voice/bye.mp3";
	 $("#wave-audio").get(0).play();
});
$(document).on("pagecreate", "#start-p1-t4", function(){
	 $("#wave-audio").get(0).src = "voice/come.mp3";
	 $("#wave-audio").get(0).play();
});
$(document).on("pagecreate", "#start-p1-t5", function(){
	 $("#wave-audio").get(0).src = "voice/bye.mp3";
	 $("#wave-audio").get(0).play();
});
$(document).on("pagecreate", "#start-p1-t6", function(){
	 $("#wave-audio").get(0).src = "voice/quiet.mp3";
	 $("#wave-audio").get(0).play();
});
$(document).on("pagecreate", "#start-p1-t7", function(){
	 $("#wave-audio").get(0).src = "voice/bye.mp3";
	 $("#wave-audio").get(0).play();
});
$(document).on("pagecreate", "#start-p1-t8", function(){
	 $("#wave-audio").get(0).src = "voice/quiet.mp3";
	 $("#wave-audio").get(0).play();
});
$(document).on("pagecreate", "#start-p1-t9", function(){
	 $("#wave-audio").get(0).src = "voice/come.mp3";
	 $("#wave-audio").get(0).play();
});
$(document).on("pagecreate", "#start-p1-t10", function(){
	 $("#wave-audio").get(0).src = "voice/bye.mp3";
	 $("#wave-audio").get(0).play();
});


// Set second tab active
$(document).on("pagecreate", "#manual-2", function(){
	 $("#manual-2-active").click();
});

// Set third tab active
$(document).on("pagecreate", "#manual-3", function(){
	 $("#manual-3-active").click();
});

// Display popup on image click
function imgPop(loc,msg){
	$("#"+msg).popup( "open", {positionTo: loc});
}

// Toggle search bar
function toggleSearch(){
	$(".search-form").toggle();
}

// Toggle change check icon to black and back
function invertIcon(){
	$(this).toggleClass("ui-alt-icon");
}

// Play instruction
function playInstruction(sd){
	switch (sd){
		case 'bye' :
			$("#wave-audio").get(0).src = "voice/bye.mp3";
			break;
		case 'come' :
			$("#wave-audio").get(0).src = "voice/come.mp3";
			break;
		case 'quiet' :
			$("#wave-audio").get(0).src = "voice/quiet.mp3";
			break;
	}
	$("#wave-audio").get(0).play();
}

// Play reinforcement
function playCorrect(){
	
	//Draw a line around selected image
	$(".wave-correct").addClass("wave-selected");
	setTimeout(function (){
		$(".wave-correct").removeClass("wave-selected");
	}, 100);

	// Play a random reinforcement 
	var rnd = Math.floor(Math.random() * 4) + 1;	
	switch (rnd){
		case 1 :
			$("#wave-audio").get(0).src = "voice/good-job.mp3";
			break;
		case 2 :
			$("#wave-audio").get(0).src = "voice/nice-job.mp3";
			break;
		case 3 :
			$("#wave-audio").get(0).src = "voice/well-done.mp3";
			break;
		case 4 :
			$("#wave-audio").get(0).src = "voice/you-did-it.mp3";
			break;
	}	
	$("#wave-audio").get(0).play();
	
	// Find current trial page
	var trial = $('.ui-page-active').attr('id');
	
	// If last trial
	if (trial.substr(10,2) == "10"){
		
		// Show complete message
		setTimeout(function (){
			$("#wave-audio").get(0).src = "voice/fantastic.mp3";
			$("#wave-audio").get(0).play();
			$.mobile.pageContainer.pagecontainer("change", "#last-start-popup", {role: "dialog"});
		}, 3000);
	}
	
	else{
		// Find next trial page
		var nextTrial = trial.substr(0,10)+(parseInt(trial.substr(10,1))+1);
		
		// Move to the next trial
		setTimeout(function (){
			$.mobile.pageContainer.pagecontainer("change", "#"+nextTrial, {transition: "slide"});
		}, 3000);
	}
}

function playWrong(){
		
		// Play sound
		$("#wave-audio").get(0).src = "voice/try-again.mp3";
		$("#wave-audio").get(0).play();
		
		// Highlight correct answer
		setTimeout(function (){
			$(".wave-correct").addClass("wave-highlight");
		}, 1000);
}
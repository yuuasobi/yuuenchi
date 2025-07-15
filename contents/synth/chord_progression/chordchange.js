	$(document).ready(function () {
//転調
	//コード
		$("#c0").hover(
			function () {
				$("#chordhoverroot").addClass("chordchange");
				$("#scalechange0_3").addClass("chordchange");
			
			},
			function () {
				$("#chordhoverroot").removeClass("chordchange");
				$("#scalechange0_3").removeClass("chordchange");
		}
		);
		$("#c1").hover(
			function () {
				$("#chordhoversubdominant").addClass("chordchange");
				$("#scalechange3_5").addClass("chordchange");
				$("#scalechange4_2").addClass("chordchange");
			},
			function () {
				$("#chordhoversubdominant").removeClass("chordchange");
				$("#scalechange3_5").removeClass("chordchange");
				$("#scalechange4_2").removeClass("chordchange");
		}
		);
		$("#c2").hover(
			function () {
				$("#chordhoverdominant").addClass("chordchange");
				$("#scalechange0_5").addClass("chordchange");
				$("#scalechange1_1").addClass("chordchange");
			},
			function () {
				$("#chordhoverdominant").removeClass("chordchange");
				$("#scalechange0_5").removeClass("chordchange");
				$("#scalechange1_1").removeClass("chordchange");
		}
		);
		$("#c3").hover(
			function () {
				$("#chordhoversubdominant").addClass("chordchange");
				$("#scalechange3_0").addClass("chordchange");
			},
			function () {
				$("#chordhoversubdominant").removeClass("chordchange");
				$("#scalechange3_0").removeClass("chordchange");
		}
		);
		$("#c4").hover(
			function () {
				$("#chordhoverdominant").addClass("chordchange");
			},
			function () {
				$("#chordhoverdominant").removeClass("chordchange");
		}
		);
		$("#c5").hover(
			function () {
				$("#chordhoverroot").addClass("chordchange");
				$("#scalechange0_1").addClass("chordchange");
				$("#scalechange3_2").addClass("chordchange");
			},
			function () {
				$("#chordhoverroot").removeClass("chordchange");
				$("#scalechange0_1").removeClass("chordchange");
				$("#scalechange3_2").removeClass("chordchange");
		}
		);
		
		$("#seven0").hover(
			function () {
				$("#chordhoverroot").addClass("chordchange");
				$("#scalechange0_3").addClass("chordchange");
			
			},
			function () {
				$("#chordhoverroot").removeClass("chordchange");
				$("#scalechange0_3").removeClass("chordchange");
		}
		);
		$("#seven1").hover(
			function () {
				$("#chordhoversubdominant").addClass("chordchange");
				$("#scalechange3_5").addClass("chordchange");
				$("#scalechange4_2").addClass("chordchange");
			},
			function () {
				$("#chordhoversubdominant").removeClass("chordchange");
				$("#scalechange3_5").removeClass("chordchange");
				$("#scalechange4_2").removeClass("chordchange");
		}
		);
		$("#seven2").hover(
			function () {
				$("#chordhoverdominant").addClass("chordchange");
				$("#scalechange0_5").addClass("chordchange");
				$("#scalechange1_1").addClass("chordchange");
			},
			function () {
				$("#chordhoverdominant").removeClass("chordchange");
				$("#scalechange0_5").removeClass("chordchange");
				$("#scalechange1_1").removeClass("chordchange");
		}
		);
		$("#seven3").hover(
			function () {
				$("#chordhoversubdominant").addClass("chordchange");
				$("#scalechange3_0").addClass("chordchange");
			},
			function () {
				$("#chordhoversubdominant").removeClass("chordchange");
				$("#scalechange3_0").removeClass("chordchange");
		}
		);
		$("#seven4").hover(
			function () {
				$("#chordhoverdominant").addClass("chordchange");
				$("#u4").addClass("chordchange");
			},
			function () {
				$("#chordhoverdominant").removeClass("chordchange");
				$("#u4").removeClass("chordchange");
		}
		);
		$("#seven5").hover(
			function () {
				$("#chordhoverroot").addClass("chordchange");
				$("#scalechange0_1").addClass("chordchange");
				$("#scalechange3_2").addClass("chordchange");
			},
			function () {
				$("#chordhoverroot").removeClass("chordchange");
				$("#scalechange0_1").removeClass("chordchange");
				$("#scalechange3_2").removeClass("chordchange");
		}
		);
		
	//ルート
		$("#root0").hover(
			function () {
				$("#scalechange3_4").addClass("chordchange");
				$("#u0").addClass("chordchange");
			},
			function () {
				$("#scalechange3_4").removeClass("chordchange");
				$("#u0").removeClass("chordchange");
		}
		);
		$("#root1").hover(
			function () {
				$("#scalechange0_4").addClass("chordchange");
				$("#u1").addClass("chordchange");
			},
			function () {
				$("#scalechange0_4").removeClass("chordchange");
				$("#u1").removeClass("chordchange");
		}
		);
		$("#root2").hover(
			function () {
				$("#scalechange2_4").addClass("chordchange");
				$("#u2").addClass("chordchange");
			},
			function () {
				$("#scalechange2_4").removeClass("chordchange");
				$("#u2").removeClass("chordchange");
		}
		);
		$("#root4").hover(
			function () {
				$("#scalechange0_0").addClass("chordchange");
				$("#scalechange1_3").addClass("chordchange");
				$("#scalechange3_1").addClass("chordchange");
				$("#scalechange4_5").addClass("chordchange");
				$("#scalechange5_2").addClass("chordchange");
			},
			function () {
				$("#scalechange0_0").removeClass("chordchange");
				$("#scalechange1_3").removeClass("chordchange");
				$("#scalechange3_1").removeClass("chordchange");
				$("#scalechange4_5").removeClass("chordchange");
				$("#scalechange5_2").removeClass("chordchange");
		}
		);
		$("#root6").hover(
			function () {
				$("#scalechange0_2").addClass("chordchange");
				$("#scalechange1_5").addClass("chordchange");
				$("#scalechange2_1").addClass("chordchange");
				$("#scalechange3_3").addClass("chordchange");
				$("#scalechange4_0").addClass("chordchange");
			},
			function () {
				$("#scalechange0_2").removeClass("chordchange");
				$("#scalechange1_5").removeClass("chordchange");
				$("#scalechange2_1").removeClass("chordchange");
				$("#scalechange3_3").removeClass("chordchange");
				$("#scalechange4_0").removeClass("chordchange");
		}
		);
		
	//サブドミナント
		$("#subdominant0").hover(
			function () {
				$("#scalechange3_4").addClass("chordchange");
				$("#scalechange4_1").addClass("chordchange");
				$("#scalechange5_5").addClass("chordchange");
				$("#scalechange7_2").addClass("chordchange");
				$("#u0").addClass("chordchange");
			},
			function () {
				$("#scalechange3_4").removeClass("chordchange");
				$("#scalechange4_1").removeClass("chordchange");
				$("#scalechange5_5").removeClass("chordchange");
				$("#scalechange7_2").removeClass("chordchange");
				$("#u0").removeClass("chordchange");
		}
		);
		$("#subdominant1").hover(
			function () {
				$("#scalechange0_4").addClass("chordchange");
				$("#u1").addClass("chordchange");
			},
			function () {
				$("#scalechange0_4").removeClass("chordchange");
				$("#u1").removeClass("chordchange");
		}
		);
		$("#subdominant2").hover(
			function () {
				$("#scalechange4_3").addClass("chordchange");
				$("#scalechange5_0").addClass("chordchange");
			},
			function () {
				$("#scalechange4_3").removeClass("chordchange");
				$("#scalechange5_0").removeClass("chordchange");
		}
		);
		$("#subdominant3").hover(
			function () {
				$("#scalechange4_4").addClass("chordchange");
				$("#scalechange5_1").addClass("chordchange");
				$("#scalechange7_5").addClass("chordchange");
				$("#u3").addClass("chordchange");
			},
			function () {
				$("#scalechange4_4").removeClass("chordchange");
				$("#scalechange5_1").removeClass("chordchange");
				$("#scalechange7_5").removeClass("chordchange");
				$("#u3").removeClass("chordchange");
		}
		);
		$("#subdominant4").hover(
			function () {

				$("#scalechange3_1").addClass("chordchange");
				$("#scalechange4_5").addClass("chordchange");
				$("#scalechange5_2").addClass("chordchange");
			},
			function () {
				$("#scalechange3_1").removeClass("chordchange");
				$("#scalechange4_5").removeClass("chordchange");
				$("#scalechange5_2").removeClass("chordchange");
		}
		);
		$("#subdominant5").hover(
			function () {
				$("#scalechange1_4").addClass("chordchange");
				$("#u5").addClass("chordchange");
			},
			function () {
				$("#scalechange1_4").removeClass("chordchange");
				$("#u5").removeClass("chordchange");
		}
		);
		$("#subdominant6").hover(
			function () {
				$("#scalechange3_3").addClass("chordchange");
				$("#scalechange4_0").addClass("chordchange");
			},
			function () {
				$("#scalechange3_3").removeClass("chordchange");
				$("#scalechange4_0").removeClass("chordchange");
		}
		);
		
		//ドミナント
		$("#dominant1").hover(
			function () {
				$("#scalechange0_4").addClass("chordchange");
				$("#scalechange1_0").addClass("chordchange");
				$("#scalechange2_3").addClass("chordchange");
				$("#u1").addClass("chordchange");
			},
			function () {
				$("#scalechange0_4").removeClass("chordchange");
				$("#scalechange1_0").removeClass("chordchange");
				$("#scalechange2_3").removeClass("chordchange");
				$("#u1").removeClass("chordchange");
		}
		);
		$("#dominant2").hover(
			function () {
				$("#scalechange2_4").addClass("chordchange");
				$("#u2").addClass("chordchange");
			},
			function () {
				$("#scalechange2_4").removeClass("chordchange");
				$("#u2").removeClass("chordchange");
		}
		);		
		$("#dominant3").hover(
			function () {
				$("#scalechange1_2").addClass("chordchange");
				$("#scalechange2_5").addClass("chordchange");
				$("#scalechange6_1").addClass("chordchange");
			},
			function () {
				$("#scalechange1_2").removeClass("chordchange");
				$("#scalechange2_5").removeClass("chordchange");
				$("#scalechange6_1").removeClass("chordchange");
		}
		);
		$("#dominant4").hover(
			function () {
				$("#scalechange0_0").addClass("chordchange");
				$("#scalechange1_3").addClass("chordchange");
				$("#scalechange3_1").addClass("chordchange");
				$("#scalechange4_5").addClass("chordchange");
				$("#scalechange5_2").addClass("chordchange");
			},
			function () {
				$("#scalechange0_0").removeClass("chordchange");
				$("#scalechange1_3").removeClass("chordchange");
				$("#scalechange3_1").removeClass("chordchange");
				$("#scalechange4_5").removeClass("chordchange");
				$("#scalechange5_2").removeClass("chordchange");
		}
		);
		$("#dominant5").hover(
			function () {
				$("#scalechange1_4").addClass("chordchange");
				$("#u5").addClass("chordchange");
			},
			function () {
				$("#scalechange1_4").removeClass("chordchange");
				$("#u5").removeClass("chordchange");
		}
		);	
		$("#dominant6").hover(
			function () {
				$("#scalechange0_2").addClass("chordchange");
				$("#scalechange1_5").addClass("chordchange");
				$("#scalechange2_1").addClass("chordchange");
				$("#scalechange6_4").addClass("chordchange");
				$("#u6").addClass("chordchange");
			},
			function () {
				$("#scalechange0_2").removeClass("chordchange");
				$("#scalechange1_5").removeClass("chordchange");
				$("#scalechange2_1").removeClass("chordchange");
				$("#scalechange6_4").removeClass("chordchange");
				$("#u6").removeClass("chordchange");
		}
		);
		
	//同主調
		$("#parallel0").hover(
			function () {
				$("#scalechange4_1").addClass("chordchange");
				$("#scalechange5_5").addClass("chordchange");
				$("#scalechange7_2").addClass("chordchange");
			},
			function () {
				$("#scalechange4_1").removeClass("chordchange");
				$("#scalechange5_5").removeClass("chordchange");
				$("#scalechange7_2").removeClass("chordchange");
		}
		);
		$("#parallel2").hover(
			function () {
				$("#scalechange4_3").addClass("chordchange");
				$("#scalechange5_0").addClass("chordchange");
			},
			function () {
				$("#scalechange4_3").removeClass("chordchange");
				$("#scalechange5_0").removeClass("chordchange");
		}
		);
		$("#parallel3").hover(
			function () {
				$("#scalechange5_1").addClass("chordchange");
				$("#scalechange7_5").addClass("chordchange");
			},
			function () {
				$("#scalechange5_1").removeClass("chordchange");
				$("#scalechange7_5").removeClass("chordchange");				
		}
		);
		$("#parallel5").hover(
			function () {
				$("#scalechange5_3").addClass("chordchange");
				$("#scalechange7_0").addClass("chordchange");
			},
			function () {
				$("#scalechange5_3").removeClass("chordchange");
				$("#scalechange7_0").removeClass("chordchange");
		}
		);
		
	//Ⅶm-5
		$("#minorflatfive6").hover(
			function () {
				$("#scalechange3_3").addClass("chordchange");
				$("#scalechange4_0").addClass("chordchange");
			},
			function () {
				$("#scalechange3_3").removeClass("chordchange");
				$("#scalechange4_0").removeClass("chordchange");
		}
		);		
	//裏コード
		$("#u2").hover(
			function () {
				$("#scalechange5_4").addClass("chordchange");
			},
			function () {
				$("#scalechange5_4").removeClass("chordchange");
		}
		);
		$("#u3").hover(
			function () {
				$("#scalechange6_4").addClass("chordchange");
			},
			function () {
				$("#scalechange6_4").removeClass("chordchange");
		}
		);
		$("#u5").hover(
			function () {
				$("#scalechange7_4").addClass("chordchange");
			},
			function () {
				$("#scalechange7_4").removeClass("chordchange");
		}
		);
		$("#u6").hover(
			function () {
				$("#scalechange4_4").addClass("chordchange");
			},
			function () {
				$("#scalechange4_4").removeClass("chordchange");
		}
		);
		
	//転調先①
		$("#scalechange0_0").hover(
			function () {
				$("#dominant4").addClass("chordchange");
				$("#root4").addClass("chordchange");
				$("#scalechange1_3").addClass("chordchange");
			},
			function () {
				$("#dominant4").removeClass("chordchange");
				$("#root4").removeClass("chordchange");
				$("#scalechange1_3").removeClass("chordchange");
		}
		);
		$("#scalechange0_1").hover(
			function () {
				$("#scalechange3_2").addClass("chordchange");
			},
			function () {
				$("#scalechange3_2").removeClass("chordchange");
		}
		);
		$("#scalechange0_2").hover(
			function () {
				$("#scalechange1_5").addClass("chordchange");
				$("#scalechange2_1").addClass("chordchange");
				$("#root6").addClass("chordchange");
				$("#dominant6").addClass("chordchange");
			},
			function () {
				$("#scalechange1_5").removeClass("chordchange");
				$("#scalechange2_1").removeClass("chordchange");
				$("#root6").removeClass("chordchange");
				$("#dominant6").removeClass("chordchange");
		}
		);
		$("#scalechange0_4").hover(
			function () {
				$("#root1").addClass("chordchange");
				$("#subdominant1").addClass("chordchange");
				$("#dominant1").addClass("chordchange");
			},
			function () {
				$("#root1").removeClass("chordchange");
				$("#subdominant1").removeClass("chordchange");
				$("#dominant1").removeClass("chordchange");
		}
		);		
		$("#scalechange0_5").hover(
			function () {
				$("#scalechange1_1").addClass("chordchange");
			},
			function () {
				$("#scalechange1_1").removeClass("chordchange");
		}
		);
		
	//転調先②
		$("#scalechange1_0").hover(
			function () {
				$("#scalechange2_3").addClass("chordchange");
				$("#dominant1").addClass("chordchange");
			},
			function () {
				$("#scalechange2_3").removeClass("chordchange");
				$("#dominant1").removeClass("chordchange");
		}
		);		
		$("#scalechange1_1").hover(
			function () {
				$("#scalechange0_5").addClass("chordchange");
			},
			function () {
				$("#scalechange0_5").removeClass("chordchange");
		}
		);			
		$("#scalechange1_2").hover(
			function () {
				$("#scalechange2_5").addClass("chordchange");
				$("#scalechange6_1").addClass("chordchange");
				$("#dominant3").addClass("chordchange");
			},
			function () {
				$("#scalechange2_5").removeClass("chordchange");
				$("#scalechange6_1").removeClass("chordchange");
				$("#dominant3").removeClass("chordchange");
		}
		);	
		$("#scalechange1_3").hover(
			function () {
				$("#scalechange0_0").addClass("chordchange");
				$("#root4").addClass("chordchange");
				$("#dominant4").addClass("chordchange");
			},
			function () {
				$("#scalechange0_0").removeClass("chordchange");
				$("#root4").removeClass("chordchange");
				$("#dominant4").removeClass("chordchange");
		}
		);
		$("#scalechange1_4").hover(
			function () {
				$("#dominant5").addClass("chordchange");
				$("#subdominant5").addClass("chordchange");
			},
			function () {
				$("#dominant5").removeClass("chordchange");
				$("#subdominant5").removeClass("chordchange");
		}
		);		
		$("#scalechange1_5").hover(
			function () {
				$("#scalechange0_2").addClass("chordchange");
				$("#scalechange2_1").addClass("chordchange");
				$("#root6").addClass("chordchange");
				$("#dominant6").addClass("chordchange");
			},
			function () {
				$("#scalechange0_2").removeClass("chordchange");
				$("#scalechange2_1").removeClass("chordchange");
				$("#root6").removeClass("chordchange");
				$("#dominant6").removeClass("chordchange");
		}
		);	
	
	//転調先③
		$("#scalechange2_1").hover(
			function () {
				$("#root6").addClass("chordchange");
				$("#dominant6").addClass("chordchange");
			},
			function () {
				$("#root6").removeClass("chordchange");
				$("#dominant6").removeClass("chordchange");
		}
		);
		$("#scalechange2_3").hover(
			function () {
				$("#dominant1").addClass("chordchange");
			},
			function () {
				$("#dominant1").removeClass("chordchange");
		}
		);
		$("#scalechange2_4").hover(
			function () {
				$("#root2").addClass("chordchange");
				$("#dominant2").addClass("chordchange");
			},
			function () {
				$("#root2").removeClass("chordchange");
				$("#dominant2").removeClass("chordchange");
		}
		);
		$("#scalechange2_5").hover(
			function () {
				$("#dominant3").addClass("chordchange");
			},
			function () {
				$("#dominant3").removeClass("chordchange");
		}
		);
		
	//転調先④
		$("#scalechange6_1").hover(
			function () {
				$("#dominant3").addClass("chordchange");
			},
			function () {
				$("#dominant3").removeClass("chordchange");
		}
		);
		$("#scalechange6_4").hover(
			function () {
				$("#dominant6").addClass("chordchange");
			},
			function () {
				$("#dominant6").removeClass("chordchange");
		}
		);
		
	//転調先⑤
		$("#scalechange3_1").hover(
			function () {
				$("#root4").addClass("chordchange");
				$("#subdominant4").addClass("chordchange");
				$("#dominant4").addClass("chordchange");
			},
			function () {
				$("#root4").removeClass("chordchange");
				$("#subdominant4").removeClass("chordchange");
				$("#dominant4").removeClass("chordchange");
		}
		);
		$("#scalechange3_3").hover(
			function () {
				$("#root6").addClass("chordchange");
				$("#subdominant6").addClass("chordchange");
				$("#minorflatfive6").addClass("chordchange");
			},
			function () {
				$("#root6").removeClass("chordchange");
				$("#subdominant6").removeClass("chordchange");
				$("#minorflatfive6").removeClass("chordchange");
		}
		);
		$("#scalechange3_4").hover(
			function () {
				$("#root0").addClass("chordchange");
				$("#subdominant0").addClass("chordchange");
			},
			function () {
				$("#root0").removeClass("chordchange");
				$("#subdominant0").removeClass("chordchange");
		}
		);
		
	//転調先⑥
		$("#scalechange4_0").hover(
			function () {
				$("#root6").addClass("chordchange");
				$("#subdominant6").addClass("chordchange");
				$("#minorflatfive6").addClass("chordchange");
			},
			function () {
				$("#root6").removeClass("chordchange");
				$("#subdominant6").removeClass("chordchange");
				$("#minorflatfive6").removeClass("chordchange");
		}
		);		
		$("#scalechange4_1").hover(
			function () {
				$("#subdominant0").addClass("chordchange");
				$("#parallel0").addClass("chordchange");
			},
			function () {
				$("#subdominant0").removeClass("chordchange");
				$("#parallel0").removeClass("chordchange");
		}
		);
		$("#scalechange4_3").hover(
			function () {
				$("#subdominant2").addClass("chordchange");
				$("#parallel2").addClass("chordchange");
			},
			function () {
				$("#subdominant2").removeClass("chordchange");
				$("#parallel2").removeClass("chordchange");
		}
		);
		$("#scalechange4_4").hover(
			function () {
				$("#subdominant3").addClass("chordchange");
			},
			function () {
				$("#subdominant3").removeClass("chordchange");
		}
		);
		$("#scalechange4_5").hover(
			function () {
				$("#root4").addClass("chordchange");
				$("#subdominant4").addClass("chordchange");
				$("#dominant4").addClass("chordchange");
			},
			function () {
				$("#root4").removeClass("chordchange");
				$("#subdominant4").removeClass("chordchange");
				$("#dominant4").removeClass("chordchange");
		}
		);
		
	//転調先⑦
		$("#scalechange5_0").hover(
			function () {
				$("#subdominant2").addClass("chordchange");
				$("#parallel2").addClass("chordchange");
			},
			function () {
				$("#subdominant2").removeClass("chordchange");
				$("#parallel2").removeClass("chordchange");
		}
		);
		$("#scalechange5_1").hover(
			function () {
				$("#subdominant3").addClass("chordchange");
				$("#parallel3").addClass("chordchange");
			},
			function () {
				$("#subdominant3").removeClass("chordchange");
				$("#parallel3").removeClass("chordchange");
		}
		);
		$("#scalechange5_2").hover(
			function () {
				$("#root4").addClass("chordchange");
				$("#subdominant4").addClass("chordchange");
				$("#dominant4").addClass("chordchange");
			},
			function () {
				$("#root4").removeClass("chordchange");
				$("#subdominant4").removeClass("chordchange");
				$("#dominant4").removeClass("chordchange");
		}
		);
		$("#scalechange5_3").hover(
			function () {
				$("#parallel5").addClass("chordchange");
			},
			function () {
				$("#parallel5").removeClass("chordchange");
		}
		);
		$("#scalechange5_5").hover(
			function () {
				$("#subdominant0").addClass("chordchange");
				$("#parallel0").addClass("chordchange");
			},
			function () {
				$("#subdominant0").removeClass("chordchange");
				$("#parallel0").removeClass("chordchange");
		}
		);
	
	//転調先⑧
		$("#scalechange7_0").hover(
			function () {
				$("#parallel5").addClass("chordchange");
			},
			function () {
				$("#parallel5").removeClass("chordchange");
		}
		);
		$("#scalechange7_2").hover(
			function () {
				$("#subdominant0").addClass("chordchange");
				$("#parallel0").addClass("chordchange");
			},
			function () {
				$("#subdominant0").removeClass("chordchange");
				$("#parallel0").removeClass("chordchange");
		}
		);
		$("#scalechange7_5").hover(
			function () {
				$("#subdominant3").addClass("chordchange");
				$("#parallel3").addClass("chordchange");
			},
			function () {
				$("#subdominant3").removeClass("chordchange");
				$("#parallel3").removeClass("chordchange");
		}
		);
		
		
	});


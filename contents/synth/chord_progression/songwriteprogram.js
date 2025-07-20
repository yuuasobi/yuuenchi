	function full() {
		chord();
		bpm();
		genre();
		rhythm();
	}

//コード
	function chord() {
		var chord, chordUsed, chordUra, movechord;
		var seventh, tension, alteredtension;
		var basetone, pitch, pitchdefault, pitchdefaultflat, pitchdefaultsharp;
		var root, dominant, subdominant, parallel, minorflatfive;
		var subchord, sub;
		var secoundaryDominant;
		var fnc, num;
		var	fnc  = ["T", "SD", "T/D", "SD", "D", "T", "D/SD"]
		var	num  = ["Ⅰ", "Ⅱm", "Ⅲm", "Ⅳ", "Ⅴ", "Ⅵm", "Ⅶm-5"]
		var churchmode = ["ｱｲｵﾆｱﾝ", "ﾄﾞﾘｱﾝ", "ﾌﾘｼﾞｱﾝ", "ﾘﾃﾞｨｱﾝ", "ﾐｸｿﾘﾃﾞｨｱﾝ", "ｴｵﾘｱﾝ", "ﾛｸﾘｱﾝ"];
		var Dorian,  Phrigian, Lydian, Mixolydian, Aeolian, Locrian;
		var scale = document.scaleset.scale.value;
		var key, keysetflat, keysetflatUra, keysetsharp, keysetsharpUra;
		var sevenchord = document.getElementById("sevenbasechord");
		var threeChordCheck = document.getElementById("threeChordCheck");
		var scalechange, scalechange0, scalechange1, scalechange2, scalechange3, scalechange4;

		keyflat = [
			["F", "G", "A", "Bb", "C", "D", "E"],
			["Bb", "C", "D", "Eb", "F", "G", "A"],
			["Eb", "F", "G", "Ab", "Bb", "C", "D"],
			["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
			["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
			["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
			["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"]
		];
		keyflatUra = [
			["B7", "C#7", "D#7", "E7", "F#7", "G#7", "A#7"],
			["E7", "F#7", "G#7", "A7", "B7", "C#7", "D#7"],
			["A7", "B7", "C#7", "D7", "E7", "F#7", "G#"],
			["D7", "E7", "F#7", "G7", "A7", "B7", "C#7"],
			["G7", "A7", "B7", "C7", "D7", "E7", "F#7"],
			["C7", "D7", "E7", "F7", "G7", "A7", "B7"],
			["F7", "G7", "A7", "Bb7", "C7", "D7", "E7"]
		];

		keysharp = [
			["G", "A", "B", "C", "D", "E", "F#"],
			["D", "E", "F#", "G", "A", "B", "C#"],
			["A", "B", "C#", "D", "E", "F#", "G#"],
			["E", "F#", "G#", "A", "B", "C#", "D#"],
			["B", "C#", "D#", "E", "F#", "G#", "A#"],
			["F#", "G#", "A#", "B", "C#", "D#", "E#"],
			["C#", "D#", "E#", "F#", "G#", "A#", "B#"]
		];

		keysharpUra = [
			["Db7", "Eb7", "F7", "Gb7", "Ab7", "Bb7", "C7"],
			["Ab7", "Bb7", "C7", "Db7", "Eb7", "F7", "G7"],
			["Eb7", "F7", "G7", "Ab7", "Bb7", "C7", "D7"],
			["Bb7", "C7", "D7", "Eb7", "F7", "G7", "A7"],
			["F7", "G7", "A7", "Bb7", "C7", "D7", "E7"],
			["C7", "D7", "E7", "F7", "G7", "A7", "B7"],
			["G7", "A7", "B7", "C7", "D7", "E7", "Gb7"]
		];

		pitch = ["C", "D", "E", "F", "G", "A", "B"];
		chordUra = ["F#/Gb", "G#m", "Bbm", "B", "Db", "D#m/Ebm", ""]

		for (var n = 0; n < 6; n++) {
			if (scale == "sharp" + n) {
				pitch = keysharp[n];
				chordUra = keysharpUra[n];
			} else if (scale == "flat" + n) {
				pitch = keyflat[n];
				chordUra = keyflatUra[n];
			} else if (scale == "default") {
				pitch = ["C", "D", "E", "F", "G", "A", "B"];
				chordUra = ["F#7", "G#7", "Bb7", "B7", "C#7", "D#7", "F7"]
			}
		}

		if (scale == "default") {
			scalechange = ["G / Em (#1)", "D / Bm (#2)", "A / F#m (#3)" , "F / Dm (b1)", "Bb / Gm (b2)", "Eb / Cm (b3)", "E / C#m (#4)", "Ab / Fm (b4)"];
			scalechange0 = ["GM7", "Am7", "Bm7", "CM7", "D7", "Em7", "F#m7-5"];
			scalechange1 = ["DM7", "Em7", "F#m7", "GM7", "A7", "Bm7", "C#m7-5"];
			scalechange2 = ["AM7", "Bm7", "C#m7", "DM7", "E7", "F#m7", "G#m7-5"];
			scalechange3 = ["FM7", "Gm7", "Am7", "BbM7", "C7", "Dm7", "Em7-5"];
			scalechange4 = ["BbM7", "Cm7", "Dm7", "EbM7", "F7", "Gm7", "Am7-5"];
			scalechange5 = ["EbM7", "Fm7", "Gm7", "AbM7", "Bb7", "Cm7", "Dm7-5"];
			scalechange6 = ["EM7", "F#m7", "G#m7", "AM7", "B7", "C#m7", "D#m7-5"];
			scalechange7 = ["AbM7", "Bbm7", "Cm7", "DbM7", "Eb7", "Fm7", "Gm7-5"];
		} else if (scale == "sharp0") {
			scalechange = ["D / Bm (#2)", "A / F#m (#3)", "E / C#m (#4)", "C / Am", "F / Dm (b1)", "Bb / Gm (b2)", "B / G#m (#5)", "Eb / Cm (b3)"];
			scalechange0 = ["DM7", "Em7", "F#m7", "GM7", "A7", "Bm7", "C#m7-5"];
			scalechange1 = ["AM7", "Bm7", "C#m7", "DM7", "E7", "F#m7", "G#m7-5"];
			scalechange2 = ["EM7", "F#m7", "G#m7", "AM7", "B7", "C#m7", "D#m7-5"];
			scalechange3 = ["CM7", "Dm7", "Em7", "FM7", "G7", "Am7", "Bm7-5"];
			scalechange4 = ["FM7", "Gm7", "Am7", "BbM7", "C7", "Dm7", "Em7-5"];
			scalechange5 = ["BbM7", "Cm7", "Dm7", "EbM7", "F7", "Gm7", "Am7-5"];
			scalechange6 = ["BM7", "C#m7", "D#m7 (Ebm7)", "EM7", "F#7", "G#m7", "A#m7-5"];
			scalechange7 = ["EbM7", "Fm7", "Gm7", "AbM7", "Bb7", "Cm7", "Dm7-5"];
		} else if (scale == "sharp1") {
			scalechange = ["A / F#m (#3)", "E / C#m (#4)", "B / G#m (#5)", "G / Em (#1)", "C / Am", "F / Dm (b1)", "F# / D#m (#6)", "Bb / Gm (b2)"];
			scalechange0 = ["AM7", "Bm7", "C#m7", "DM7", "E7", "F#m7", "G#m7-5"];
			scalechange1 = ["EM7", "F#m7", "G#m7", "AM7", "B7", "C#m7", "D#m7-5"];
			scalechange2 = ["BM7", "C#m7", "D#m7", "EM7", "F#7", "G#m7", "A#m7-5"];
			scalechange3 = ["GM7", "Am7", "Bm7", "CM7", "D7", "Em7", "F#m7-5"];
			scalechange4 = ["CM7", "Dm7", "Em7", "FM7", "G7", "Am7", "Bm7-5"];
			scalechange5 = ["FM7", "Gm7", "Am7", "BbM7", "C7", "Dm7", "Em7-5"];
			scalechange6 = ["F#M7", "G#m7", "A#m7 (Bbm7)", "BM7", "C#7", "D#m7", "Fm7-5"];
			scalechange7 = ["BbM7", "Cm7", "Dm7", "EbM7", "F7", "Gm7", "Am7-5"];
		} else if (scale == "sharp2") {
			scalechange = ["E / C#m (#4)", "B / G#m (#5)", "F# / D#m (#6)", "D / Bm (#2)", "G / Em (#1)", "C / Am", "C# / A#m (#7)", "F / Dm (b1)"];
			scalechange0 = ["EM7", "F#m7", "G#m7", "AM7", "B7", "C#m7", "D#m7-5"];
			scalechange1 = ["BM7", "C#m7", "D#m7", "EM7", "F#7", "G#m7", "A#m7-5"];
			scalechange2 = ["F#M7", "G#m7", "A#m7", "BM7", "C#7", "D#m7", "Fm7-5"];
			scalechange3 = ["DM7", "Em7", "F#m7", "GM7", "A7", "Bm7", "C#m7-5"];
			scalechange4 = ["GM7", "Am7", "Bm7", "CM7", "D7", "Em7", "F#m7-5"];
			scalechange5 = ["CM7", "Dm7", "Em7", "FM7", "G7", "Am7", "Bm7-5"];
			scalechange6 = ["C#M7", "D#m7", "Fm7", "F#M7", "G#7", "A#m7", "Cm7-5"];
			scalechange7 = ["FM7", "Gm7", "Am7", "BbM7", "C7", "Dm7", "Em7-5"];
		} else if (scale == "sharp3") {
			scalechange = ["B / G#m (#5)", "F# / D#m (#6)", "C# / A#m (#7)", "A / F#m (#3)", "D / Bm (#2)", "G / Em (#1)", "Ab / Fm (b4)", "C / Am"];
			scalechange0 = ["BM7", "C#m7", "D#m7", "EM7", "F#7", "G#m7", "A#m7-5"];
			scalechange1 = ["F#M7", "G#m7", "A#m7", "BM7", "C#7", "D#m7", "Fm7-5"];
			scalechange2 = ["C#M7", "D#m7", "Fm7", "F#M7", "G#7", "A#m7", "Cm7-5"];
			scalechange3 = ["AM7", "Bm7", "C#m7", "DM7", "E7", "F#m7", "G#m7-5"];
			scalechange4 = ["DM7", "Em7", "F#m7", "GM7", "A7", "Bm7", "C#m7-5"];
			scalechange5 = ["GM7", "Am7", "Bm7", "CM7", "D7", "Em7", "F#m7-5"];
			scalechange6 = ["AbM7", "Bbm7 (A#m7)", "Cm7", "DbM7 (C#M7)", "Eb7 (D#7)", "Fm7 (E#m7)", "Gm7-5"];
			scalechange7 = ["CM7", "Dm7", "Em7", "FM7", "G7", "Am7", "Bm7-5"];
		} else if (scale == "sharp4") {
			scalechange = ["F# / D#m (#6)", "C# / A#m (#7)", "Ab / Fm (b4)", "E / C#m (#4)" , "A / F#m (#3)", "D / Bm (#2)", "Eb / Cm (b3)", "G / Em (#1)"];
			scalechange0 = ["F#M7", "G#m7", "A#m7", "BM7", "C#7", "D#m7", "Fm7-5"];
			scalechange1 = ["C#M7", "D#m7", "Fm7 (E#m7)", "F#M7", "G#7", "A#m7", "Cm7-5"];
			scalechange2 = ["AbM7", "Bbm7 (A#m7)", "Cm7", "DbM7 (C#M7)", "Eb7 (D#7)", "Fm7 (E#m7)", "Gm7-5"];
			scalechange3 = ["EM7", "F#m7", "G#m7", "AM7", "B7", "C#m7", "D#m7-5"];
			scalechange4 = ["AM7", "Bm7", "C#m7", "DM7", "E7", "F#m7", "G#m7-5"];
			scalechange5 = ["DM7", "Em7", "F#m7", "GM7", "A7", "Bm7", "C#m7-5"];
			scalechange6 = ["EbM7", "Fm7 (E#m7)", "Gm7", "AbM7 (G#M7)", "Bb7 (A#7)", "Cm7 (B#m7)", "Dm7-5"];
			scalechange7 = ["GM7", "Am7", "Bm7", "CM7", "D7", "Em7", "F#m7-5"];
		} else if (scale == "sharp5") {
			scalechange = ["C# / A#m (#7)", "Ab / Fm (b4)", "Eb / Cm (b3)", "B / G#m (#5)", "E / C#m (#4)" , "A / F#m (#3)", "Bb / Gm (b2)", "D / Bm (#2)"];
			scalechange0 = ["C#M7", "D#m7", "Fm7 (E#m7)", "F#M7", "G#7", "A#m7", "Cm7-5"];
			scalechange1 = ["AbM7 (G#M7)", "Bbm7 (A#m7)", "Cm7 (B#m7)", "DbM7 (C#M7)", "Eb7 (D#7)", "Fm7 (E#m7)", "Gm7-5"];
			scalechange2 = ["EbM7", "Fm7", "Gm7", "AbM7 (G#M7)", "Bb7 (A#7)", "Cm7 (B#m7)", "Dm7-5"];
			scalechange3 = ["BM7", "C#m7", "D#m7", "EM7", "F#7", "G#m7", "A#m7-5"];
			scalechange4 = ["EM7", "F#m7", "G#m7", "AM7", "B7", "C#m7", "D#m7-5"];
			scalechange5 = ["AM7", "Bm7", "C#m7", "DM7", "E7", "F#m7", "G#m7-5"];
			scalechange6 = ["BbM7", "Cm7 (B#m7)", "Dm7", "EbM7", "F7", "Gm7", "Am7-5"];
			scalechange7 = ["DM7", "Em7", "F#m7", "GM7", "A7", "Bm7", "C#m7-5"];
		} else if (scale == "flat0") {
			scalechange = ["C / Am", "G / Em (#1)", "D / Bm (#2)", "Bb / Gm (b2)", "Eb / Cm (b3)", "Ab / Fm (b4)", "A / F#m (#3)", "Db / Bbm (b5)"];
			scalechange0 = ["CM7", "Dm7", "Em7", "FM7", "G7", "Am7", "Bm7-5"];
			scalechange1 = ["GM7", "Am7", "Bm7", "CM7", "D7", "Em7", "F#m7-5"];
			scalechange2 = ["DM7", "Em7", "F#m7", "GM7", "A7", "Bm7", "C#m7-5"];
			scalechange3 = ["BbM7", "Cm7", "Dm7", "EbM7", "F7", "Gm7", "Am7-5"];
			scalechange4 = ["EbM7", "Fm7", "Gm7", "AbM7", "Bb7", "Cm7", "Dm7-5"];
			scalechange5 = ["AbM7", "Bbm7", "Cm7", "DbM7", "Eb7", "Fm7", "Gm7-5"];
			scalechange6 = ["AM7", "Bm7", "C#m7", "DM7", "E7", "F#m7", "G#m7-5"];
			scalechange7 = ["DbM7", "Ebm7 (D#m7)", "Fm7", "GbM7", "Ab7", "Bbm7", "Cm7-5"];
		} else if (scale == "flat1") {
			scalechange = ["F / Dm (b1)", "C / Am", "G / Em (#1)", "Eb / Cm (b3)", "Ab / Fm (b4)", "Db / Bbm (b5)", "D / Bm (#2)", "Gb / Ebm (b6)"];
			scalechange0 = ["FM7", "Gm7", "Am7", "BbM7", "C7", "Dm7", "Em7-5"];
			scalechange1 = ["CM7", "Dm7", "Em7", "FM7", "G7", "Am7", "Bm7-5"];
			scalechange2 = ["GM7", "Am7", "Bm7", "CM7", "D7", "Em7", "F#m7-5"];
			scalechange3 = ["EbM7", "Fm7", "Gm7", "AbM7", "Bb7", "Cm7", "Dm7-5"];
			scalechange4 = ["AbM7", "Bbm7", "Cm7", "DbM7", "Eb7", "Fm7", "Gm7-5"];
			scalechange5 = ["DbM7", "Ebm7", "Fm7", "GbM7", "Ab7", "Bbm7", "Cm7-5"];
			scalechange6 = ["DM7", "Em7", "F#m7", "GM7", "A7", "Bm7", "C#m7-5"];
			scalechange7 = ["GbM7", "Abm7 (G#m7)", "Bbm7", "BM7 (CbM7)", "Db7", "Ebm7", "Fm7-5"];
		}  else if (scale == "flat2") {
			scalechange = ["Bb / Gm (b2)", "F / Dm (b1)", "C / Am", "Ab / Fm (b4)", "Db / Bbm (b5)", "Gb / Ebm (b6)", "G / Em (#1)", "Cb / Abm (b7)"];
			scalechange0 = ["BbM7", "Cm7", "Dm7", "EbM7", "F7", "Gm7", "Am7-5"];
			scalechange1 = ["FM7", "Gm7", "Am7", "BbM7", "C7", "Dm7", "Em7-5"];
			scalechange2 = ["CM7", "Dm7", "Em7", "FM7", "G7", "Am7", "Bm7-5"];
			scalechange3 = ["AbM7", "Bbm7", "Cm7", "DbM7", "Eb7", "Fm7", "Gm7-5"];
			scalechange4 = ["DbM7", "Ebm7", "Fm7", "GbM7", "Ab7", "Bbm7", "Cm7-5"];
			scalechange5 = ["GbM7", "Abm7", "Bbm7", "BM7 (CbM7)", "Db7", "Ebm7", "Fm7-5"];
			scalechange6 = ["GM7", "Am7", "Bm7", "CM7", "D7", "Em7", "F#m7-5"];
			scalechange7 = ["BM7 (CbM7)", "Dbm7 (C#m7)", "Ebm7", "EM7 (FbM7)", "Gb7", "Abm7", "Bbm7-5"];
		} else if (scale == "flat3") {
			scalechange = ["Eb / Cm (b3)", "Bb / Gm (b2)", "F / Dm (b1)", "Db / Bbm (b5)", "Gb / Ebm (b6)", "Cb / Abm (b7)", "C / Am", "E / C#m (#4)"];
			scalechange0 = ["EbM7", "Fm7", "Gm7", "AbM7", "Bb7", "Cm7", "Dm7-5"];
			scalechange1 = ["BbM7", "Cm7", "Dm7", "EbM7", "F7", "Gm7", "Am7-5"];
			scalechange2 = ["FM7", "Gm7", "Am7", "BbM7", "C7", "Dm7", "Em7-5"];
			scalechange3 = ["DbM7", "Ebm7", "Fm7", "GbM7", "Ab7", "Bbm7", "Cm7-5"];
			scalechange4 = ["GbM7", "Abm7", "Bbm7", "BM7 (CbM7)", "Db7", "Ebm7", "Fm7-5"];
			scalechange5 = ["BM7 (CbM7)", "Dbm7", "Ebm7", "EM7 (FbM7)", "Gb7", "Abm7", "Bbm7-5"];
			scalechange6 = ["CM7", "Dm7", "Em7", "FM7", "G7", "Am7", "Bm7-5"];
			scalechange7 = ["EM7 (FbM7)", "F#m7 (Gbm7)", "G#m7 (Abm7)", "AM7 (BbbM7)", "B7", "C#m7 (Dbm7)", "D#m7-5"];
		} else if (scale == "flat4") {
			scalechange = ["Ab / Fm (b4)", "Eb / Cm (b3)", "Bb / Gm (b2)", "Gb / Ebm (b6)", "Cb / Abm (b7)", "E / C#m (#4)", "F / Dm (b1)", "A / F#m (#3)"];
			scalechange0 = ["AbM7", "Bbm7", "Cm7", "DbM7", "Eb7", "Fm7", "Gm7-5"];
			scalechange1 = ["EbM7", "Fm7", "Gm7", "AbM7", "Bb7", "Cm7", "Dm7-5"];
			scalechange2 = ["BbM7", "Cm7", "Dm7", "EbM7", "F7", "Gm7", "Am7-5"];
			scalechange3 = ["GbM7", "Abm7", "Bbm7", "BM7 (CbM7)", "Db7", "Ebm7", "Fm7-5"];
			scalechange4 = ["BM7 (CbM7)", "Dbm7", "Ebm7", "EM7 (FbM7)", "Gb7", "Abm7", "Bbm7-5"];
			scalechange5 = ["EM7 (FbM7)", "F#m7 (Gbm7)", "G#m7 (Abm7)", "AM7 (BbbM7)", "B7", "C#m7 (Dbm7)", "D#m7-5"];
			scalechange6 = ["FM7", "Gm7", "Am7", "BbM7", "C7", "Dm7", "Em7-5"];
			scalechange7 = ["AM7 (BbbM7)", "Bm7 (Cbm7)", "C#m7 (Dbm7)", "DM7 (EbbM7)", "E7", "F#m7 (Gbm7)", "G#m7-5"];
		} else if (scale == "flat5") {
			scalechange = ["Db / Bbm (b5)", "Ab / Fm (b4)", "Eb / Cm (b3)", "Cb / Abm (b7)", "E / C#m (#4)", "A / F#m (#3)", "Bb / Gm (b2)", "D / Bm (#2)"];
			scalechange0 = ["DbM7", "Ebm7", "Fm7", "GbM7", "Ab7", "Bbm7", "Cm7-5"];
			scalechange1 = ["AbM7", "Bbm7", "Cm7", "DbM7", "Eb7", "Fm7", "Gm7-5"];
			scalechange2 = ["EbM7", "Fm7", "Gm7", "AbM7", "Bb7", "Cm7", "Dm7-5"];
			scalechange3 = ["BM7 (CbM7)", "Dbm7", "Ebm7", "EM7 (FbM7)", "Gb7", "Abm7", "Bbm7-5"];
			scalechange4 = ["EM7 (FbM7)", "F#m7 (Gbm7)", "G#m7 (Abm7)", "AM7 (BbbM7)", "B7 (Cb7)", "C#m7 (Dbm7)", "D#m7-5"];
			scalechange5 = ["AM7 (BbbM7)", "Bm7 (Cbm7)", "C#m7 (Dbm7)", "DM7 (EbbM7)", "E7", "F#m7 (Gbm7)", "G#m7-5"];
			scalechange6 = ["BbM7", "Cm7", "Dm7", "EbM7", "F7", "Gm7", "Am7-5"];
			scalechange7 = ["DM7", "Em7", "F#m7  (Gbm7)", "GM7", "A7", "Bm7 (Cbm7)", "C#m7-5"];
		}


		basetone = pitch[0];
		subchord = [pitch[0], pitch[2]+"m", pitch[5]+"m", pitch[4]+"7"];
		sub = subchord[Math.floor(Math.random() * subchord.length)];
		chord = [
			pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m", pitch[6]+"m-5　　" + sub
		];
		movechord = [
				pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m", pitch[6]+"m-5　　" + sub
			];
		chordUsed = [
			pitch[0], pitch[1]+"m", pitch[2]+"m", pitch[3],　pitch[4], pitch[5]+"m", pitch[6]+"m-5"
		];
		seventh = [
			pitch[0]+"M7", pitch[1]+"m7", pitch[2]+"m7", pitch[3]+"M7",　pitch[4]+"7", pitch[5]+"m7", pitch[6]+"m7-5"
		];
		tension = [
			"9th" + " / " + "+13th", "+11th", "+11th" + " / " + "+13th",
			"9th" + " / " + "11th" + " / " + "13th", "9th", "+11th" + " / " + "+13th", "+13th"
		];
		alteredtension = ["+#11th", "+b13", "", "", "", "", ""];
		secoundaryDominant = [
			pitch[0]+"7" + "　-　" + pitch[3]+"7" + "　-　" + pitch[6]+"7" + "　-　" + pitch[2]+"7" + "　-　" +
			pitch[5]+"7" + "　-　" + pitch[1]+"7" + "　-　" + pitch[4]+"7" + "　-　" + pitch[0]+"7",
		];
		root = [
			pitch[0]+"7"/* + " / " + pitch[0]+"aug"*/, pitch[1]+"7", pitch[2]+"7", "",
			pitch[4]+"m7" + " / " + pitch[4]+"M7"/* + " / " + pitch[4]+"#dim7"*/, "", pitch[6]+"bM7" + " / " + pitch[6]+"m7"
		];
		dominant = [
			"", pitch[1]+"7" + " / " + pitch[1]+"M7"/* + " / " + pitch[1]+"#dim7"*/, pitch[2]+"7",
			pitch[3]+"#m7", pitch[4]+"M7" + " / " + pitch[4]+"m7"/* + " / " + pitch[4]+"aug"*/,
			pitch[5]+"7", pitch[6]+"m7" + " / " + pitch[6]+"7"
		];
		subdominant = [
			pitch[0]+"7" + " / " + pitch[0]+"m7"/* + " / " + pitch[0]+"#dim7"*/, pitch[1]+"7", pitch[2]+"bM7",
			pitch[3]+"7" + " / " + pitch[3]+"m7"/* + " / " + pitch[3]+"aug"*/, pitch[4]+"m7", pitch[5]+"7", pitch[6]+"bM7"
		];
		parallel = [
			pitch[0]+"m7", "", pitch[2]+"bM7", pitch[3]+"m7", "", pitch[5]+"bM7", ""
		];
		minorflatfive = [
			"", "", "", "", "", "", pitch[6]+"bM7"
		];

		if (threeChordCheck.checked == true) {
			fnc  = ["T", "SD", "D",]
			num  = ["Ⅰ","Ⅳ", "Ⅴ"]
			movechord = [
				pitch[0], pitch[3],　pitch[4]
			];
			var c1 = Math.floor(Math.random() * movechord.length);
			var c2 = Math.floor(Math.random() * movechord.length);
			var c3 = Math.floor(Math.random() * movechord.length);
			var c4 = Math.floor(Math.random() * movechord.length);
			var c5 = Math.floor(Math.random() * movechord.length);
			var c6 = Math.floor(Math.random() * movechord.length);
			var c7 = Math.floor(Math.random() * movechord.length);
			var c8 = Math.floor(Math.random() * movechord.length);
		} else if (sevenchord.checked == true) {
			var c1 = Math.floor(Math.random() * (movechord.length -1));
			var c2 = Math.floor(Math.random() * movechord.length);
			var c3 = Math.floor(Math.random() * movechord.length);
			var c4 = Math.floor(Math.random() * movechord.length);
			var c5 = Math.floor(Math.random() * movechord.length);
			var c6 = Math.floor(Math.random() * movechord.length);
			var c7 = Math.floor(Math.random() * movechord.length);
			var c8 = Math.floor(Math.random() * (movechord.length -1));
		} else {
			var c1 = Math.floor(Math.random() * (movechord.length -1));
			var c2 = Math.floor(Math.random() * (movechord.length -1));
			var c3 = Math.floor(Math.random() * (movechord.length -1));
			var c4 = Math.floor(Math.random() * (movechord.length -1));
			var c5 = Math.floor(Math.random() * (movechord.length -1));
			var c6 = Math.floor(Math.random() * (movechord.length -1));
			var c7 = Math.floor(Math.random() * (movechord.length -1));
			var c8 = Math.floor(Math.random() * (movechord.length -1));
		}


		for (var n=0; n < 7; n++) {

			document.getElementById('p' + n).innerHTML = pitch[n];
			document.getElementById('c' + n).innerHTML = chordUsed[n];
			document.getElementById('seven' + n).innerHTML = seventh[n];
			document.getElementById('u' + n).innerHTML = chordUra[n];
			document.getElementById('s' + n).innerHTML = churchmode[n];
			document.getElementById('tension' + n).innerHTML = tension[n];
			document.getElementById('alteredtension' + n).innerHTML = alteredtension[n];
			document.getElementById('root' + n).innerHTML = root[n];
			document.getElementById('dominant' + n).innerHTML = dominant[n];
			document.getElementById('subdominant' + n).innerHTML = subdominant[n];
			document.getElementById('parallel' + n).innerHTML = parallel[n];
			document.getElementById('minorflatfive' + n).innerHTML = minorflatfive[n];
			document.getElementById('scalechange0_' + n).innerHTML = scalechange0[n];
			document.getElementById('scalechange1_' + n).innerHTML = scalechange1[n];
			document.getElementById('scalechange2_' + n).innerHTML = scalechange2[n];
			document.getElementById('scalechange3_' + n).innerHTML = scalechange3[n];
			document.getElementById('scalechange4_' + n).innerHTML = scalechange4[n];
			document.getElementById('scalechange5_' + n).innerHTML = scalechange5[n];
			document.getElementById('scalechange6_' + n).innerHTML = scalechange6[n];
			document.getElementById('scalechange7_' + n).innerHTML = scalechange7[n];
		}

		for (var n=0; n < 8; n++) {
			document.getElementById('scalechange' + n).innerHTML = scalechange[n];
		}

		document.getElementById('m1').innerHTML = movechord[c1];
		document.getElementById('m2').innerHTML = movechord[c2];
		document.getElementById('m3').innerHTML = movechord[c3];
		document.getElementById('m4').innerHTML = movechord[c4];
		document.getElementById('m5').innerHTML = movechord[c5];
		document.getElementById('m6').innerHTML = movechord[c6];
		document.getElementById('m7').innerHTML = movechord[c7];
		document.getElementById('m8').innerHTML = movechord[c8];

		document.getElementById('f1').innerHTML = fnc[c1];
		document.getElementById('f2').innerHTML = fnc[c2];
		document.getElementById('f3').innerHTML = fnc[c3];
		document.getElementById('f4').innerHTML = fnc[c4];
		document.getElementById('f5').innerHTML = fnc[c5];
		document.getElementById('f6').innerHTML = fnc[c6];
		document.getElementById('f7').innerHTML = fnc[c7];
		document.getElementById('f8').innerHTML = fnc[c8];

		document.getElementById('num1').innerHTML = num[c1];
		document.getElementById('num2').innerHTML = num[c2];
		document.getElementById('num3').innerHTML = num[c3];
		document.getElementById('num4').innerHTML = num[c4];
		document.getElementById('num5').innerHTML = num[c5];
		document.getElementById('num6').innerHTML = num[c6];
		document.getElementById('num7').innerHTML = num[c7];
		document.getElementById('num8').innerHTML = num[c8];

		document.getElementById('root').innerHTML = chord[0] + " / " + chord[5];
		document.getElementById('subdominant').innerHTML = chord[3] + " / " + chord[1];
		document.getElementById('dominant').innerHTML = chord[4] + " / " + chord[2];
		document.getElementById('parallel').innerHTML = pitch[0] +"m";
		document.getElementById('minorflatfive').innerHTML = chordUsed[6];
		document.getElementById('secoundaryDominant').innerHTML = secoundaryDominant;

	}

//テンポ
	function bpm() {
		var tempo = Math.floor(Math.random() * (200 - 60) + 60);
		document.getElementById('bpm').innerHTML = tempo;
		// ミキサーのテンポ表示も更新
		const bpmValueElement = document.getElementById('bpm-value');
		if (bpmValueElement) {
			bpmValueElement.textContent = tempo;
		}
	}

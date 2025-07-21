// ChordHoverManager クラス - コードホバーイベントの管理
class ChordHoverManager {
    constructor() {
        this.chordMappings = this.initializeChordMappings();
        this.bindEvents();
    }

    // コードマッピングの初期化
    initializeChordMappings() {
        return {
            'c0': ['chordhoverroot', 'scalechange0_3'],
            'c1': ['chordhoversubdominant', 'scalechange3_5', 'scalechange4_2'],
            'c2': ['chordhoverdominant', 'scalechange0_5', 'scalechange1_1'],
            'c3': ['chordhoversubdominant', 'scalechange3_0'],
            'c4': ['chordhoverdominant'],
            'c5': ['chordhoverroot', 'scalechange0_1', 'scalechange3_2'],
            'c6': ['chordhoverminorflatfive'],
            'seven0': ['chordhoverroot', 'scalechange0_3'],
            'seven1': ['chordhoversubdominant', 'scalechange3_5', 'scalechange4_2'],
            'seven2': ['chordhoverdominant', 'scalechange0_5', 'scalechange1_1'],
            'seven3': ['chordhoversubdominant', 'scalechange3_0'],
            'seven4': ['chordhoverdominant'],
            'seven5': ['chordhoverroot', 'scalechange0_1', 'scalechange3_2'],
            'seven6': ['chordhoverminorflatfive']
        };
    }

    // イベントのバインド
    bindEvents() {
        Object.keys(this.chordMappings).forEach(chordId => {
            const element = document.getElementById(chordId);
            if (element) {
                $(`#${chordId}`).hover(
                    () => this.highlightChords(chordId),
                    () => this.unhighlightChords(chordId)
                );
            }
        });
    }

    // コードのハイライト
    highlightChords(chordId) {
        const targetElements = this.chordMappings[chordId];
        if (targetElements) {
            targetElements.forEach(elementId => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.classList.add('chordchange');
                }
            });
        }
    }

    // コードのハイライト解除
    unhighlightChords(chordId) {
        const targetElements = this.chordMappings[chordId];
        if (targetElements) {
            targetElements.forEach(elementId => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.classList.remove('chordchange');
                }
            });
        }
    }
}

// DOMContentLoadedイベントで初期化
$(document).ready(function () {
    // 新しいChordHoverManagerを初期化
    const chordHoverManager = new ChordHoverManager();
    
    // 既存のイベントハンドラーを保持（後で段階的に移行）
    // 転調
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
        },
        function () {
            $("#chordhoverdominant").removeClass("chordchange");
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
    $("#seven6").hover(
        function () {
            $("#chordhoverminorflatfive").addClass("chordchange");
        },
        function () {
            $("#chordhoverminorflatfive").removeClass("chordchange");
    }
    );
});


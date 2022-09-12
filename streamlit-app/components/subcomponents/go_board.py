
import streamlit.components.v1 as components

# TODO: Stop loading source from S3
WGO_HTML = """
<script type="text/javascript" src="https://katago.s3.amazonaws.com/wgo.min.js"></script>
<script type="text/javascript" src="https://katago.s3.amazonaws.com/wgo.player.min.js"></script>
<link type="text/css" href="https://katago.s3.amazonaws.com/wgo.player.css" rel="stylesheet" />
<div data-wgo="{sgf_str}" data-wgo-allowillegal="True" style="width: 700px">
Sorry, your browser doesn't support WGo.js. Download SGF <a href="game.sgf">directly</a>.
</div>
"""

def go_board(sgf_str):
    components.html(WGO_HTML.format(sgf_str=sgf_str), height=600)
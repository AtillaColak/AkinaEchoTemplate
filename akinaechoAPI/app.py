from flask import Flask, jsonify, request, abort, Response
from endpoint import fetch_data
from getsongsnippets import getSongSnippets
from flask_cors import CORS


app = Flask(__name__)
# I removed Ssme security and authentication for API use codes here for security. 

@app.route('/home/', methods=['GET', 'POST'])
def welcome():
    api_key = request.headers.get('x-api-key')
    if api_key != 'APIKEY':
        resp = Response(f"Unauthorized: Received API Key - {api_key}")
        resp.status_code = 401
        return resp

    return "Hello World"

@app.route('/question_of_the_day', methods=['GET'])
def get_question_of_the_day():
    api_key = request.headers.get('x-api-key')
    if api_key != 'APIKEY':
        resp = Response(f"Unauthorized: Received API Key - {api_key}")
        resp.status_code = 401
        return resp

    question = fetch_data(False)
    result = getSongSnippets(question.to_dict('records'))

    while True:
        if any(song['preview_url'] is None for song in result):
            question = fetch_data(True)
            result = getSongSnippets(question.to_dict('records'))
        else:
            return jsonify(result)
    else:
        # This block will run if the while loop exhausted all retries without breaking
        print("Exhausted all retries without finding valid preview URLs for all songs.")
    # Used above  code because some preview URl's are null.
    return jsonify(result)  # Convert the question to a JSON response

if __name__ == '__main__':
    app.run()

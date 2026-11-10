import urllib.request

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        print(f"Redirect code: {code}")
        print(f"Redirect Access-Control-Allow-Origin: {headers.get('Access-Control-Allow-Origin')}")
        print(f"Location: {newurl[:60]}")
        return None

opener = urllib.request.build_opener(NoRedirect)
req = urllib.request.Request(
    'https://docs.google.com/spreadsheets/d/1nqOd_F-H60hE8lwObZyBhLhAHFBidV0UKkqLVvl81Ro/export?format=xlsx',
    headers={'Origin': 'https://example.com'}
)
try:
    resp = opener.open(req)
except urllib.error.HTTPError as e:
    print(f"HTTPError: {e.code}")
    print(f"CORS header on error: {e.headers.get('Access-Control-Allow-Origin')}")


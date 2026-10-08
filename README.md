# Roshni & Luis — Wedding Week

A small static website for October 10–14, 2026. No build step or package install is required.

## Local preview

In PowerShell, from this folder:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

If Python is not on PATH, use the Python runtime supplied by Codex on this computer:

```powershell
& 'C:\Users\luisgut\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000 in a browser. Leave the terminal running and use Ctrl+C to stop the server. This is a local preview; it does not update GitHub or the published website.

## Iterating

- `app.js`: dates, event times, locations, guest notes, and optional activities.
- `styles.css`: the Northwest design, responsive layouts, and print styles.
- `index.html`: the page title, introduction, header, and footer.

Save a file and refresh the browser. Use Ctrl+Shift+R if the browser shows an older copy. Date links support direct URLs such as http://localhost:8000/#oct-11. Use browser device emulation to inspect the phone layout.

Check all five days, directions, the Google Calendar form, the downloaded .ics event, and print preview before publishing. The Google link pre-fills a new event; the guest still chooses whether to save it. Apple/Outlook downloads use UTC timestamps so the calendar can display them in the guest's timezone. Imports are independent copies and do not update automatically when the website changes.

## Content to confirm before publication

- Earls dinner is shown at 7 PM from the separate event. Civil ceremony notes also mention dinner at 6 PM and a 4 PM cocktail hour.
- Confirm the previous invitation's attire guidance still applies before adding it to this iteration.
- Breakfast serving details on Tuesday remain unspecified.
- Individual flights are omitted in favor of arrival/departure summaries; some calendar titles differ from their time blocks.
- October 13 evening dinner is not listed in the current calendar and is omitted pending confirmation.

The October 11 Mehndi event and shortened Agave dinner were re-read from Google Calendar on October 8. Explore Redmond and the apartment visit are flexible suggestions from the couple, not reservations.

Keep `CNAME` for the existing custom domain. Push only after the local version is reviewed.

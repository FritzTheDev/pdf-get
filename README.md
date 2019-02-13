# Easy-WSU (Water Supply Update)

## Easy-WSU makes reservoir analysis & mass pdf downloads easy.
This is a project I've built on behalf of The Water Agency, Inc, a company that does consulting for water transactions in California's Central Valley. They gather data to compile a weekly report that previously took a full day to put together. This tool saves 1 man-hour a week that was previously spent gathering data & massaging it into a usable form.
---
There's two main "Pages" in the electron app, "Pdf-Getter" and "Reservoir Summary Generator", which also happen to describe the two main functionalities.

### PDF-Getter
PDF-Getter, as you might imagine, gets a selection of pdfs. It's designed as a tool targeting data from the california data exchange center, but in theory it'd work for any given PDF with an accessible URL. The configuration dictating which PDFS are targeted is stored locally in a JSON file.

### Reservoir Analysis Summary

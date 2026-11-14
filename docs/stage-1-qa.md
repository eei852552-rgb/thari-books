# Stage 1 Homepage QA Record

Last reviewed: 2026-11-14
Repository: `eei852552-rgb/thari-books`
Branch: `main`

## Verified by GitHub Actions

Latest verified homepage build commit:
`075e1d5e3c6bca80b41b7f5bf62b21bf161886dc`

GitHub Actions run:
https://github.com/eei852552-rgb/thari-books/actions/runs/43605136716

The following checks completed successfully:

- Dependency installation
- TypeScript check
- Static website build
- Portable hero image exists in the generated output
- Required platform config asset exists in the generated output
- GitHub Pages subpath is present in the generated homepage

## Code-level checks completed

- Grade cards explain that verified catalogue content is still being prepared.
- General-library category cards explain that the catalogue is not yet available.
- Demo book cards are explicitly labelled as demonstrations, not real books.
- Search normalizes Unicode text to NFC and supports grade shorthand such as G1.
- Search placeholder describes the current searchable scope.
- Mobile navigation uses hidden/inert state while closed.
- Dialogs include accessible names and descriptions.
- Dialog keyboard focus is kept within the open dialog.
- Escape key and backdrop click close dialogs.

These are code and build checks. They do not replace testing on a real mobile browser.

## Live deployment status

The public URL was checked in a browser:

https://eei852552-rgb.github.io/thari-books/

Observed result: GitHub Pages 404 page ("There isn't a GitHub Pages site here"). The THARi BOOKS homepage could not be loaded, so its live mobile layout, images, search, navigation, and dialogs could not be evaluated.

A previous Pages deployment run built and uploaded the artifact but failed at the deployment step with HTTP 404. The repository Pages publishing configuration needs to be reviewed in GitHub Settings > Pages > Build and deployment > Source. Select GitHub Actions when the repository owner is ready to publish.

No repository settings were changed as part of this QA work. Public deployment remains pending owner action.

## Not implemented in Stage 1

- User accounts or authentication
- Database or server-side catalogue
- Book uploads or downloads
- Membership or payment processing
- Real book catalogue
- Admin dashboard

Do not present these as available features until implemented and tested.

## Next QA steps after Pages is enabled

1. Open the public homepage on Android Chrome at narrow and wider viewport widths.
2. Check horizontal overflow and image loading.
3. Test mobile navigation open/close and all in-page links.
4. Test search with Myanmar Unicode text, English text, and G1-style grade shorthand.
5. Test demo and status dialogs using touch, keyboard, and Escape.
6. Re-check the deployed commit and its GitHub Actions run before reporting the site as live.

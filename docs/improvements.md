## Improvements

Since this project is in its basic form, there are lots of improvements available to be done:
* Add `Users` class and related endpoints such as `CRUD`, `Auth`, etc.
	* Enrich Unit Test Cases.
* Use `PostgreSQL` or `MySQL` as a persistent storage instead of keeping the list of listings and users on air and `Redis` as a temporary storage.
	* Create Containerized Integration Test Cases.
* Use `Docker` Orchestration Tool such as `Kubernetes` or even simpler, `Docker Compose` to cleanly run all the services including `PostgreSQL` or `MySQL` and `Redis`.
* Decompose endpoint implementations into middlewares such as validators and authenticators.
* Use [`joi`](https://www.npmjs.com/package/joi) as a data and schema validator to restrict the format of the listing and user objects.

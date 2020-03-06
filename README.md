Hello fellow developer.

I hope you will like my solution. It was quite difficult to resolve the test in the given time frame.

I opted for a React solution because the job spec has React at its base.

You will notice a big lack of testing. The only 2 tests I had time to add you can find in the utils folder. These should cover the business requirements and make sure the loan is calculated correctly.

Occasionally you may find a random `any` instead of a proper type, sorry, no time. The same goes for using CSS instead of SASS. The requirements said to have an `Excellent user experience` but in 4 hours not much can be achieved. My main objective was to have a complete experience while focusing on keeping things separated.

I added dummy service which returns a different config if you enter a value smaller than 10k or bigger than 20k. Not enough time was left to add validation also for the duration.

If you wish to run this locally please `clone` -> `yarn` -> `yarn start`. The classic react app was used as a starting point. I added a few extra configs for eslint and prettier.

Looking forward to reading your feedback. Have fun reviewing.

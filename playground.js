

(function(){
    console.log("Initialized \'playground.js\' (Line 1)")
    // Listen for the ready event for any Vimeo video players on the page
    var vimeoPlayers = document.querySelectorAll('iframe'), // Select all 'iframe' tags, and assign to 'vimeoPlayers' variable
        player; // Also declare another new variable called 'player'
        console.log("Found " + vimeoPlayers.length + " video on the page. (Line 6)")  // DEBUG

    // For each video, listen for when it is ready, and then call the 'ready' function on the video
    for (var i = 0, length = vimeoPlayers.length; i < length; i++) {
        player = vimeoPlayers[i];
        $f(player).addEvent('ready', ready);  // Registers an event listener for the 'ready' event and calls the 'ready' event handler function on player
        console.log("Registered an event for the \'" + player['id'] + "\' video. (Line 8-11)"); // DEBUG
    }


    /**
     * Utility function for adding an event. Handles the inconsistencies
     * between the W3C method for adding events (addEventListener) and
     * IE's (attachEvent).
     */
    function addEvent(element, eventName, callback) {
        // console.log("Called the \'addEvent\' utility function on the " + element + " element after the " + eventName + " fired, and sent it to the " + callback +  " callback function."); // DEBUG
        if (element.addEventListener) { // Test to see if the 'addEventListener' works
            element.addEventListener(eventName, callback, false); // The first argument specifies the event to listen for, the second argument specifies the handler function and the third argument false specifies that the event capturing phase should not be used, and the event should be handled during the bubbling phase of the event propagation.
        }
        else { // Otherwise, use the 'attachedEvent' method
            element.attachEvent(eventName, callback, false);
        }
    }


    /**
     * Called once a vimeo player is loaded and ready to receive
     * commands. You can add events and make api calls only after this
     * function has been called.
     */
    function ready(player_id) {
        // Keep a reference to Froogaloop for this player
        var container = document.getElementById(player_id).parentNode.parentNode, // Access the node with id="player_id" , which is the video's iframe, moves up two nodes in the document tree, which is the class="container" element, and assigns that to the container variable
            froogaloop = $f(player_id), // Calls froogaloop on the video, and assigns that to the froogaloop variable
            apiConsole = container.querySelector('.console .output'); // Select the output console in this videos container, and assign that to the apiConsole variable
        console.log("Accessed the container node for the " + player_id + " video."); // DEBUG
        console.log("Called the froogaloop API on the " + player_id + " video.") // DEBUG

        /**
         * Prepends log messages to the example console for you to see.
         */
        function apiLog(message) {
            apiConsole.innerHTML = message + '\n' + apiConsole.innerHTML; // Take a message argument and compound add HTML inside the apiConsole element, which is '.console .output' element
            console.log('Adding a message to the console: ' + message)
        }

        /**
         * Sets up the actions for the buttons that will perform simple
         * api calls to Froogaloop (play, pause, etc.). These api methods
         * are actions performed on the player that take no parameters and
         * return no values.
         */
        function setupSimpleButtons() {
            var buttons = container.querySelector('div dl.simple'), // Access the node containing the simple buttons
                playBtn = buttons.querySelector('.play'), // Assign the play button to a variable
                pauseBtn = buttons.querySelector('.pause'), // Assign the pause button to a variable
                unloadBtn = buttons.querySelector('.unload'); // Assign the unload button to a variable
            console.log("Assigned the simple buttons to variables.") // DEBUG


            /**
            * Using our 'addEvent' utility function from above, call froogaloop API methods when the buttons are clicked.
            * We have already called the froogaloop API on our specific video, and assigned it to the 'froogaloop' variable.
            * We can now call froogaloop's methods on the video.
            */

            // Call play when play button clicked
            addEvent(playBtn, 'click', function() {
                froogaloop.api('play');
            }, false);

            // Call pause when pause button clicked
            addEvent(pauseBtn, 'click', function() {
                froogaloop.api('pause');
            }, false);

            // Call unload when unload button clicked
            addEvent(unloadBtn, 'click', function() {
                froogaloop.api('unload');
            }, false);
        }

        /**
         * Sets up the actions for the buttons that will modify certain
         * things about the player and the video in it. These methods
         * take a parameter, such as a color value when setting a color.
         */
        function setupModifierButtons() {
            var buttons = container.querySelector('div dl.modifiers'),
                seekBtn = buttons.querySelector('.seek'),
                volumeBtn = buttons.querySelector('.volume'),
                loopBtn = buttons.querySelector('.loop'),
                colorBtn = buttons.querySelector('.color'),
                randomColorBtn = buttons.querySelector('.randomColor');

            // Call seekTo when seek button clicked
            addEvent(seekBtn, 'click', function(e) {
                // Don't do anything if clicking on anything but the button (such as the input field)
                if (e.target != this) {
                    return false;
                }

                // Grab the value in the input field
                var seekVal = this.querySelector('input').value;

                // Call the api via froogaloop
                froogaloop.api('seekTo', seekVal);
            }, false);

            // Call setVolume when volume button clicked
            addEvent(volumeBtn, 'click', function(e) {
                // Don't do anything if clicking on anything but the button (such as the input field)
                if (e.target != this) {
                    return false;
                }

                // Grab the value in the input field
                var volumeVal = this.querySelector('input').value;

                // Call the api via froogaloop
                froogaloop.api('setVolume', volumeVal);
            }, false);

            // Call setLoop when loop button clicked
            addEvent(loopBtn, 'click', function(e) {
                // Don't do anything if clicking on anything but the button (such as the input field)
                if (e.target != this) {
                    return false;
                }

                // Grab the value in the input field
                var loopVal = this.querySelector('input').value;

                //Call the api via froogaloop
                froogaloop.api('setLoop', loopVal);
            }, false);

            // Call setColor when color button clicked
            addEvent(colorBtn, 'click', function(e) {
                // Don't do anything if clicking on anything but the button (such as the input field)
                if (e.target != this) {
                    return false;
                }

                // Grab the value in the input field
                var colorVal = this.querySelector('input').value;

                // Call the api via froogaloop
                froogaloop.api('setColor', colorVal);
            }, false);

            // Call setColor with a random color when random color button clicked
            addEvent(randomColorBtn, 'click', function(e) {
                // Don't do anything if clicking on anything but the button (such as the input field)
                if (e.target != this) {
                    return false;
                }

                // Generate a random color
                var colorVal = Math.floor(Math.random() * 16777215).toString(16);

                // Call the api via froogaloop
                froogaloop.api('setColor', colorVal);
            }, false);
        }

        /**
         * Sets up actions for buttons that will ask the player for something,
         * such as the current time or duration. These methods require a
         * callback function which will be called with any data as the first
         * parameter in that function.
         */
        function setupGetterButtons() {
            var buttons = container.querySelector('div dl.getters'),
                timeBtn = buttons.querySelector('.time'),
                durationBtn = buttons.querySelector('.duration'),
                colorBtn = buttons.querySelector('.color'),
                urlBtn = buttons.querySelector('.url'),
                embedBtn = buttons.querySelector('.embed'),
                pausedBtn = buttons.querySelector('.paused'),
                getVolumeBtn = buttons.querySelector('.getVolume'),
                widthBtn = buttons.querySelector('.width'),
                heightBtn = buttons.querySelector('.height');

            // Get the current time and log it to the API console when time button clicked
            addEvent(timeBtn, 'click', function(e) {
                froogaloop.api('getCurrentTime', function (value, player_id) {
                    // Log out the value in the API Console
                    apiLog('getCurrentTime : ' + value);
                });
            }, false);

            // Get the duration and log it to the API console when time button clicked
            addEvent(durationBtn, 'click', function(e) {
                froogaloop.api('getDuration', function (value, player_id) {
                    // Log out the value in the API Console
                    apiLog('getDuration : ' + value);
                });
            }, false);

            // Get the embed color and log it to the API console when time button clicked
            addEvent(colorBtn, 'click', function(e) {
                froogaloop.api('getColor', function (value, player_id) {
                    // Log out the value in the API Console
                    apiLog('getColor : ' + value);
                });
            }, false);

            // Get the video url and log it to the API console when time button clicked
            addEvent(urlBtn, 'click', function(e) {
                froogaloop.api('getVideoUrl', function (value, player_id) {
                    // Log out the value in the API Console
                    apiLog('getVideoUrl : ' + value);
                });
            }, false);

            // Get the embed code and log it to the API console when time button clicked
            addEvent(embedBtn, 'click', function(e) {
                froogaloop.api('getVideoEmbedCode', function (value, player_id) {
                    // Use html entities for less-than and greater-than signs
                    value = value.replace(/</g, '&lt;').replace(/>/g, '&gt;');

                    // Log out the value in the API Console
                    apiLog('getVideoEmbedCode : ' + value);
                });
            }, false);

            // Get the paused state and log it to the API console when time button clicked
            addEvent(pausedBtn, 'click', function(e) {
                froogaloop.api('paused', function (value, player_id) {
                    // Log out the value in the API Console
                    apiLog('paused : ' + value);
                });
            }, false);

            // Get the paused state and log it to the API console when time button clicked
            addEvent(getVolumeBtn, 'click', function(e) {
                froogaloop.api('getVolume', function (value, player_id) {
                    // Log out the value in the API Console
                    apiLog('volume : ' + value);
                });
            }, false);

            // Get the paused state and log it to the API console when time button clicked
            addEvent(widthBtn, 'click', function(e) {
                froogaloop.api('getVideoWidth', function (value, player_id) {
                    // Log out the value in the API Console
                    apiLog('getVideoWidth : ' + value);
                });
            }, false);

            // Get the paused state and log it to the API console when time button clicked
            addEvent(heightBtn, 'click', function(e) {
                froogaloop.api('getVideoHeight', function (value, player_id) {
                    // Log out the value in the API Console
                    apiLog('getVideoHeight : ' + value);
                });
            }, false);
        }

        /**
         * Adds listeners for the events that are checked. Adding an event
         * through Froogaloop requires the event name and the callback method
         * that is called once the event fires.
         */
        function setupEventListeners() {
            var checkboxes = container.querySelector('.listeners'),
                loadProgressChk = checkboxes.querySelector('.loadProgress'),
                playProgressChk = checkboxes.querySelector('.playProgress'),
                playChk = checkboxes.querySelector('.play'),
                pauseChk = checkboxes.querySelector('.pause'),
                finishChk = checkboxes.querySelector('.finish'),
                seekChk = checkboxes.querySelector('.seek');

            function onLoadProgress() {
                if (loadProgressChk.checked) {
                    froogaloop.addEvent('loadProgress', function(data) {
                        apiLog('loadProgress event : ' + data.percent + ' : ' + data.bytesLoaded + ' : ' + data.bytesTotal + ' : ' + data.duration);
                    });
                }
                else {
                    froogaloop.removeEvent('loadProgress');
                }
            }

            function onPlayProgress() {
                if (playProgressChk.checked) {
                    froogaloop.addEvent('playProgress', function(data) {
                        apiLog('playProgress event : ' + data.seconds + ' : ' + data.percent + ' : ' + data.duration);
                    });
                }
                else {
                    froogaloop.removeEvent('playProgress');
                }
            }

            function onPlay() {
                if (playChk.checked) {
                    froogaloop.addEvent('play', function(data) {
                        apiLog('play event');
                    });
                }
                else {
                    froogaloop.removeEvent('play');
                }
            }

            function onPause() {
                if (pauseChk.checked) {
                    froogaloop.addEvent('pause', function(data) {
                        apiLog('pause event');
                    });
                }
                else {
                    froogaloop.removeEvent('pause');
                }
            }

            function onFinish() {
                if (finishChk.checked) {
                    froogaloop.addEvent('finish', function(data) {
                        apiLog('finish');
                    });
                }
                else {
                    froogaloop.removeEvent('finish');
                }
            }

            function onSeek() {
                if (seekChk.checked) {
                    froogaloop.addEvent('seek', function(data) {
                        apiLog('seek event : ' + data.seconds + ' : ' + data.percent + ' : ' + data.duration);
                    });
                }
                else {
                    froogaloop.removeEvent('seek');
                }
            }

            // Listens for the checkboxes to change
            addEvent(loadProgressChk, 'change', onLoadProgress, false);
            addEvent(playProgressChk, 'change', onPlayProgress, false);
            addEvent(playChk, 'change', onPlay, false);
            addEvent(pauseChk, 'change', onPause, false);
            addEvent(finishChk, 'change', onFinish, false);
            addEvent(seekChk, 'change', onSeek, false);

            // Calls the change event if the option is checked
            // (this makes sure the checked events get attached on page load as well as on changed)
            onLoadProgress();
            onPlayProgress();
            onPlay();
            onPause();
            onFinish();
            onSeek();
        }

        /**
         * Sets up actions for adding a new clip window to the page.
         */
        function setupAddClip() {
            var button = container.querySelector('.addClip'),
                newContainer;

            addEvent(button, 'click', function(e) {
                // Don't do anything if clicking on anything but the button (such as the input field)
                if (e.target != this) {
                    return false;
                }

                // Gets the index of the current player by simply grabbing the number after the underscore
                var currentIndex = parseInt(player_id.split('_')[1]),
                    clipId = button.querySelector('input').value;

                newContainer = resetContainer(container.cloneNode(true), currentIndex+1, clipId);

                container.parentNode.appendChild(newContainer);
                $f(newContainer.querySelector('iframe')).addEvent('ready', ready);
            });

            /**
             * Resets the duplicate container's information, clearing out anything
             * that doesn't pertain to the new clip. It also sets the iframe to
             * use the new clip's id as its url.
             */
            function resetContainer(element, index, clipId) {
                var newHeading = element.querySelector('h2'),
                    newIframe = element.querySelector('iframe'),
                    newCheckBoxes = element.querySelectorAll('.listeners input[type="checkbox"]'),
                    newApiConsole = element.querySelector('.console .output'),
                    newAddBtn = element.querySelector('.addClip');

                // Set the heading text
                newHeading.innerText = 'Vimeo Player ' + index;

                // Set the correct source of the new clip id
                newIframe.src = 'http://player.vimeo.com/video/' + clipId + '?api=1&player_id=player_' + index;
                newIframe.id = 'player_' + index;

                // Reset all the checkboxes for listeners to be checked on
                for (var i = 0, length = newCheckBoxes.length, checkbox; i < length; i++) {
                    checkbox = newCheckBoxes[i];
                    checkbox.setAttribute('checked', 'checked');
                }

                // Clear out the API console
                newApiConsole.innerHTML = '';

                // Update the clip ID of the add clip button
                newAddBtn.querySelector('input').setAttribute('value', clipId);

                return element;
            }
        }

        setupSimpleButtons();
        setupModifierButtons();
        setupGetterButtons();
        setupEventListeners();
        setupAddClip();

        // Setup clear console button
        var clearBtn = container.querySelector('.console button');
        addEvent(clearBtn, 'click', function(e) {
            apiConsole.innerHTML = '';
        }, false);

        apiLog(player_id + ' ready!');
    }
})();
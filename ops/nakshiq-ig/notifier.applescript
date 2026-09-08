-- Notification owner for the NakshIQ IG brief.
--
-- Why this exists: a notification posted by bare `osascript -e "display
-- notification"` is owned by Script Editor, so clicking it opens an empty
-- Script Editor document picker instead of the brief (seen 2026-09-08).
-- An applet with its own CFBundleIdentifier owns its notifications, and
-- osacompile does NOT write one, so the build step adds it.
--
-- Why the applet posts the notification itself rather than being told to:
-- `osascript -e 'tell application id "..." to display notification'` needs
-- TCC Automation consent and fails with -1743 until a human clicks Allow.
-- Launching the applet with `open -n -a` needs no such consent.
--
-- Two modes, chosen by a marker file, because `open -a --args` never reaches
-- an applet's argv:
--   marker present -> this launch came from the daily job: post the notification
--   marker absent  -> this launch came from a NOTIFICATION CLICK: open the brief
on run
	set homePath to (POSIX path of (path to home folder))
	set markerFile to homePath & "Automation/nakshiq-ig/logs/notify-pending.txt"
	set pathFile to homePath & "Automation/nakshiq-ig/logs/latest-brief.txt"

	set hasMarker to false
	try
		do shell script "test -f " & quoted form of markerFile
		set hasMarker to true
	end try

	if hasMarker then
		set msg to "Your brief is ready. Click to open."
		try
			set msg to (do shell script "cat " & quoted form of markerFile)
		end try
		do shell script "rm -f " & quoted form of markerFile
		display notification msg with title "NakshIQ IG brief" sound name "Ping"
	else
		try
			set p to (do shell script "cat " & quoted form of pathFile)
			do shell script "open " & quoted form of p
		on error
			do shell script "open " & quoted form of (homePath & "Automation/nakshiq-ig/briefs")
		end try
	end if
end run

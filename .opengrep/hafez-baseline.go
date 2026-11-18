// Test cases for hafez-baseline.yml (run by `opengrep test .opengrep`). Never built:
// a line marked ruleid must be matched by the rule it names, a line marked ok must not.
package baseline

import (
	"context"
	"crypto/tls"
	"database/sql"
	"fmt"
	"os/exec"
)

func cases(ctx context.Context, db *sql.DB, userInput string) {
	// ruleid: hafez-go-sql-from-string
	db.Query(fmt.Sprintf("SELECT * FROM users WHERE id = %s", userInput))
	// ruleid: hafez-go-sql-from-string
	db.QueryContext(ctx, "SELECT * FROM users WHERE id = "+userInput)
	// ok: hafez-go-sql-from-string
	db.Query("SELECT * FROM users WHERE id = $1", userInput)

	// ruleid: hafez-go-shell-string
	exec.Command("sh", "-c", "git log "+userInput)
	// ok: hafez-go-shell-string
	exec.Command("git", "log", userInput)

	// ruleid: hafez-go-tls-verification-off
	_ = &tls.Config{InsecureSkipVerify: true}
	// ok: hafez-go-tls-verification-off
	_ = &tls.Config{MinVersion: tls.VersionTLS12}

	// ruleid: hafez-forwarded-for-identity
	_ = "X-Forwarded-For"
}

import argparse
import sys
import os
import json

def evaluate(inputs_dir, fail_on_critical, fail_on_high):
    print(f"[*] Evaluating Security Gates on reports in {inputs_dir}...")
    
    # Simple mock evaluation
    has_critical = False
    has_high = False
    
    for filename in os.listdir(inputs_dir):
        if not filename.endswith(".json"):
            continue
            
        filepath = os.path.join(inputs_dir, filename)
        try:
            with open(filepath, 'r') as f:
                data = json.load(f)
                
            findings = data.get("findings", [])
            for finding in findings:
                if finding.get("status") == "failed":
                    if finding.get("severity") == "critical":
                        has_critical = True
                    elif finding.get("severity") == "high":
                        has_high = True
        except Exception as e:
            print(f"[!] Error parsing {filename}: {e}")
            
    print("\n--- Gate Results ---")
    
    should_fail = False
    if has_critical and fail_on_critical:
        print("[X] FAILURE: Critical vulnerabilities found.")
        should_fail = True
    if has_high and fail_on_high:
        print("[X] FAILURE: High vulnerabilities found.")
        should_fail = True
        
    if not should_fail:
        print("[✓] SUCCESS: Security Gates passed.")
        sys.exit(0)
    else:
        print("[!] Pipeline blocked by Security Gates.")
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--inputs", required=True)
    parser.add_argument("--fail-on-critical", type=bool, default=True)
    parser.add_argument("--fail-on-high", type=bool, default=False)
    args = parser.parse_args()
    
    evaluate(args.inputs, args.fail_on_critical, args.fail_on_high)
